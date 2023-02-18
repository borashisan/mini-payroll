# frozen_string_literal: true

class PayDeductionService
  def calculate_extra_pay_amount(params)
    labor_regulations = params.fetch(:labor_regulations, nil)
    year_prescribed_working_days = labor_regulations.fetch(:year_prescribed_working_days, nil)
    raise '1年間の所定労働日数が設定されていません' unless year_prescribed_working_days

    daily_prescribed_working_hours = labor_regulations.fetch(:daily_prescribed_working_hours, nil)
    raise '1年間の所定労働時間が設定されていません' unless daily_prescribed_working_hours&.fetch(:hour, nil)

    monthly_prescribed_working_days = calculate_monthly_prescribed_working_days(year_prescribed_working_days,
                                                                                daily_prescribed_working_hours)
    allowances = params.fetch(:allowances, nil)
    basis_for_extra_pay = calculate_basis_for_extra_pay(params)

    hourly_pay_amount = calculate_hourly_pay_amount(monthly_prescribed_working_days, basis_for_extra_pay)

    attendances = params.fetch(:attendances, nil)
    overtime_allowance = calculate_overtime_allowance(hourly_pay_amount, attendances)
    late_night_allowance = calculate_late_night_allowance(hourly_pay_amount, attendances)
    legal_holiday_allowance = calculate_legal_holiday_allowance(hourly_pay_amount, attendances)

    overtime_allowance + late_night_allowance + legal_holiday_allowance
  end

  # 割増賃金の基礎となる賃金の合計を計算する
  def calculate_basis_for_extra_pay(params)
    allowances = params.fetch(:allowances, nil)
    # 実務に関連する支給かどうか判別するためにkeyの文字列をnameに保持する
    main_pay_deduction_hash = allowances.reject do |key|
                                key == 'other_allowance'
                              end.each { |key, value| value['name'] = key }
    main_pay_deductions = main_pay_deduction_hash.values

    other_pay_deductions = allowances.fetch(:other_allowance, [])

    # 基本給が存在しなければ例外を返す
    raise '基本給が設定されていません' unless allowances.fetch(:base_salary, nil)

    basis_for_extra_pay = 0

    basis_for_extra_pay += calculate_basis_for_extra_pay_amount(main_pay_deductions)
    basis_for_extra_pay += calculate_basis_for_extra_pay_amount(other_pay_deductions)

    basis_for_extra_pay
  end

  private

  DEFALT_ALLOWANCE_RELATED_LABOR = %w[base_salary position_allowance qualification_allowance].map(&:freeze).freeze

  def calculate_basis_for_extra_pay_amount(allowances)
    allowances.sum do |allowance|
      allowance_pay_unit = pay_unit(allowance)
      if is_related_labor?(allowance) || is_uniform?(allowance)
        allowance.fetch('value', 0).to_i / allowance_pay_unit
      else
        0
      end
    end
  end

  def pay_unit(allowance)
    case allowance[:pay_unit]
    when '1month'
      1
    when '3month'
      3
    when '6month'
      6
    else
      1
    end
  end

  def is_related_labor?(allowance)
    return true if DEFALT_ALLOWANCE_RELATED_LABOR.include?(allowance.fetch(:name, nil))

    allowance.fetch(:is_related_labor, nil)
  end

  def is_uniform?(allowance)
    allowance.fetch(:is_uniform, nil)
  end

  def calculate_monthly_prescribed_working_days(year_prescribed_working_days, daily_prescribed_working_hours)
    hour = daily_prescribed_working_hours.fetch(:hour).fetch(:value).to_i
    minute = daily_prescribed_working_hours.fetch(:minute, nil)&.fetch(:value).to_i

    daily_prescribed_working_minutes = hour * 60 + minute

    (year_prescribed_working_days.fetch(:value).to_i * daily_prescribed_working_minutes / (12 * 60).to_f).round
  end

  def calculate_hourly_pay_amount(monthly_prescribed_working_days, basis_for_extra_pay)
    # 時間単価は 50 銭未満切り捨て、50 銭以上 1 円未満切り上げ

    (basis_for_extra_pay / monthly_prescribed_working_days.to_f).round
  end

  def calculate_overtime_allowance(hourly_pay_amount, attendances)
    overtime_amount_minute = attendances.sum do |attendance|
      if attendance.fetch(:attendance_name) == 'overtime'
        attendance.fetch(:value).to_i
      else
        0
      end
    end
    # 1か月における時間外・深夜・休日労働のそれぞれの時間数の合計の端数は、30 分未満切り捨て、30 分以上１時間未満切り上げ

    overtime_amount_hour = (overtime_amount_minute / 60.to_f).round
    # 1か月における時間外・深夜・休日労働のそれぞれの割増賃金の総額の端数は、50 銭未満切り捨て、50 銭以上 1 円未満切り上げ

    (hourly_pay_amount * overtime_amount_hour * 1.25.to_f).round
  end

  def calculate_late_night_allowance(hourly_pay_amount, attendances)
    late_night_amount_minute = attendances.sum do |attendance|
      if attendance.fetch(:attendance_name) == 'late_night'
        attendance.fetch(:value).to_i
      else
        0
      end
    end
    # 1か月における時間外・深夜・休日労働のそれぞれの時間数の合計の端数は、30 分未満切り捨て、30 分以上１時間未満切り上げ

    late_night_amount_hour = (late_night_amount_minute / 60.to_f).round
    # 1か月における時間外・深夜・休日労働のそれぞれの割増賃金の総額の端数は、50 銭未満切り捨て、50 銭以上 1 円未満切り上げ

    (hourly_pay_amount * late_night_amount_hour * (1.25 + 0.25).to_f).round
  end

  def calculate_legal_holiday_allowance(hourly_pay_amount, attendances)
    legal_holiday_amount_minute = attendances.sum do |attendance|
      if attendance.fetch(:attendance_name) == 'legal_holiday'
        attendance.fetch(:value).to_i
      else
        0
      end
    end
    # 1か月における時間外・深夜・休日労働のそれぞれの時間数の合計の端数は、30 分未満切り捨て、30 分以上１時間未満切り上げ

    legal_holiday_amount_hour = (legal_holiday_amount_minute / 60.to_f).round
    # 1か月における時間外・深夜・休日労働のそれぞれの割増賃金の総額の端数は、50 銭未満切り捨て、50 銭以上 1 円未満切り上げ

    (hourly_pay_amount * legal_holiday_amount_hour * 1.35.to_f).round
  end
end

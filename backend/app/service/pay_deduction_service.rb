# frozen_string_literal: true

class PayDeductionService
  # 割増賃金の基礎となる賃金の合計を計算する
  def calculate_basis_for_extra_pay(params)
    main_pay_deductions = params.reject { |key| key == 'other_allowance' }.values
    other_pay_deductions = params.fetch(:other_allowance, [])

    # 基本給が存在しなければ例外を返す
    raise '基本給が設定されていません' unless params.fetch(:base_salary, nil)

    basis_for_extra_pay = 0

    basis_for_extra_pay += calculate_basis_for_extra_pay_amount(main_pay_deductions)
    basis_for_extra_pay += calculate_basis_for_extra_pay_amount(other_pay_deductions)

    basis_for_extra_pay
  end

  private

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
    allowance.fetch(:is_related_labor, nil)
  end

  def is_uniform?(allowance)
    allowance.fetch(:is_uniform, nil)
  end
end

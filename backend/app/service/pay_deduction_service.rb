# frozen_string_literal: true

class PayDeductionService
  # 割増賃金の基礎となる賃金の合計を計算する
  def calculate_basis_for_extra_pay(params)
    # 基本給
    base_salary = params.fetch(:base_salary, nil)

    raise '基本給が設定されていません' if base_salary.nil?

    # 役職手当
    position_allowance = params.fetch(:position_allowance, nil)

    # 住宅手当
    housing_allowance = params.fetch(:housing_allowance, nil)

    # 通勤手当
    commuting_allowance = params.fetch(:commuting_allowance, nil)

    # 割増賃金の基礎となる賃金の合計
    # 労働と直接的な関係が薄い支給は割増賃金の基礎となる賃金から除外する
    basis_for_extra_pay = base_salary[:value].to_i

    basis_for_extra_pay += position_allowance[:value].to_i if position_allowance

    # 住宅手当や通勤手当は一律支給であれば割増賃金の基礎となる賃金含めて、異なれば含めない
    basis_for_extra_pay += housing_allowance[:value].to_i if is_uniorm?(housing_allowance)

    if is_uniorm?(commuting_allowance)
      basis_for_extra_pay += commuting_allowance[:value].to_i / pay_unit(commuting_allowance)
    end

    basis_for_extra_pay
  end

  private

  def is_uniorm?(allowance)
    allowance[:is_uniform]
  end

  def pay_unit(allowance)
    case allowance[:pay_unit]
    when '1month'
      1
    when '3month'
      3
    when '6month'
      6
    end
  end
end

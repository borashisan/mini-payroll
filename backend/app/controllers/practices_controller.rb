# frozen_string_literal: true

class PracticesController < ApplicationController
  def practice1
    basis_for_extra_pay = PayDeductionService.new.calculate_basis_for_extra_pay(pay_deduction_params(params))
    render json: { payload: { basis_for_extra_pay: } }
  end

  def practice2
    extra_pay_amount = PayDeductionService.new.calculate_extra_pay_amount(pay_deduction_params(params))
    render json: { payload: { extra_pay_amount: } }
  end

  private

  def pay_deduction_params(params)
    params.require(:pay_deduction_params)
  end
end

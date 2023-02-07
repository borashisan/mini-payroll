class PracticesController < ApplicationController
  def practice1
    basis_for_extra_pay = PayDeductionService.new.calculate_basis_for_extra_pay(params)
    render json: { payload: { basis_for_extra_pay: basis_for_extra_pay } }
  end
end

class PracticesController < ApplicationController
  def practice1
    p params
  end

  private

  def pay_deduction_params
    params.require(:pay_deduction_params).permit
  end
end

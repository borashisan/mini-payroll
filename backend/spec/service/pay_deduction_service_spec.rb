# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PayDeductionService do
  describe '#calculate_basis_for_extra_pay' do
    context '演習1' do
      context '事例1' do
        let(:params) do
          { base_salary: { value: '320000' },
            position_allowance: { value: '70000' },
            housing_allowance: { value: '35000', is_uniform: false },
            commuting_allowance: { value: '14000', is_uniform: false, pay_unit: '1month' } }.with_indifferent_access
        end

        it '正しく計算されること' do
          expect(described_class.new.calculate_basis_for_extra_pay(params)).to eq 390_000
        end
      end
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PayDeductionService do
  describe '#calculate_basis_for_extra_pay' do
    context '演習1' do
      context '事例1' do
        let(:params) do
          {
            base_salary: { value: '320000', is_related_labor: true },
            position_allowance: { value: '70000', is_related_labor: true },
            housing_allowance: { value: '35000', is_related_labor: false, is_uniform: false },
            commuting_allowance: { value: '14000', is_related_labor: false, is_uniform: false, pay_unit: '1month' }
          }.with_indifferent_access
        end

        it '正しく計算されること' do
          expect(described_class.new.calculate_basis_for_extra_pay(params)).to eq 390_000
        end
      end

      context '事例2' do
        let(:params) do
          {
            base_salary: { value: '215000', is_related_labor: true },
            qualification_allowance: { value: '5000', is_related_labor: true },
            housing_allowance: {
              value: '10000',
              is_related_labor: false,
              is_uniform: true
            },
            commuting_allowance: {
              value: '24372',
              is_related_labor: false,
              is_uniform: false,
              pay_unit: '3month'
            },
            other_allowance: [
              {
                name: '家族手当',
                value: '16000',
                is_related_labor: false,
                is_uniform: false
              }
            ]
          }.with_indifferent_access
        end

        it '正しく計算されること' do
          expect(described_class.new.calculate_basis_for_extra_pay(params)).to eq 230_000
        end
      end
    end

    context '基本給が設定されていない' do
      let(:params) do
        {
          commuting_allowance: { value: '14000', is_related_labor: false, is_uniform: false, pay_unit: '1month' }
        }.with_indifferent_access
      end

      it 'エラーになること' do
        expect do
          described_class.new.calculate_basis_for_extra_pay(params)
        end.to raise_error(RuntimeError, '基本給が設定されていません')
      end
    end
  end
end

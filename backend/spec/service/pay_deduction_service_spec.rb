# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PayDeductionService do
  describe '#calculate_basis_for_extra_pay' do
    context '演習1' do
      context '事例1' do
        let(:params) do
          {
            allowances: {
              base_salary: { value: '320000' },
              position_allowance: { value: '70000' },
              housing_allowance: { value: '35000', is_related_labor: false, is_uniform: false },
              commuting_allowance: { value: '14000', is_related_labor: false, is_uniform: false, pay_unit: '1month' }
            }
          }.with_indifferent_access
        end

        it '正しく計算されること' do
          expect(described_class.new.calculate_basis_for_extra_pay(params)).to eq 390_000
        end
      end

      context '事例2' do
        let(:params) do
          {
            allowances: {
              base_salary: { value: '215000' },
              qualification_allowance: { value: '5000' },
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
            }
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
          allowances: {
            commuting_allowance: { value: '14000', is_related_labor: false, is_uniform: false, pay_unit: '1month' }
          }
        }.with_indifferent_access
      end

      it 'エラーになること' do
        expect do
          described_class.new.calculate_basis_for_extra_pay(params)
        end.to raise_error(RuntimeError, '基本給が設定されていません')
      end
    end
  end

  describe '#calculate_extra_pay_amount' do
    context '演習2' do
      context '事例1' do
        let(:params) do
          {
            labor_regulations: {
              year_prescribed_working_days: {
                value: '252'
              },
              daily_prescribed_working_hours: {
                hour: {
                  value: '8'
                }
              },
              closing_date: {
                value: '15'
              },
              pay_date: {
                value: '20',
                pay_month: 'current_month'
              }
            },
            allowances: {
              base_salary: {
                value: '225000'
              },
              position_allowance: {
                value: '15000'
              },
              commuting_allowance: {
                value: '15830'
              },
              other_allowance: [
                {
                  name: '家族手当',
                  value: '20000',
                  is_related_labor: false
                }
              ]
            },
            attendances: [
              {
                attendance_name: 'overtime',
                value: '62'
              },
              {
                attendance_name: 'overtime',
                value: '192'
              },
              {
                attendance_name: 'overtime',
                value: '240'
              },
              {
                attendance_name: 'late_night',
                value: '55'
              },
              {
                attendance_name: 'overtime',
                value: '87'
              },
              {
                attendance_name: 'overtime',
                value: '125'
              },
              {
                attendance_name: 'legal_holiday',
                value: '420'
              },
              {
                attendance_name: 'overtime',
                value: '152'
              },
              {
                attendance_name: 'overtime',
                value: '135'
              }
            ]
          }.with_indifferent_access
        end

        it '正しく計算されること' do
          expect(described_class.new.calculate_extra_pay_amount(params)).to eq 46_014
        end
      end

      context '事例2' do
        let(:params) do
          {
            labor_regulations: {
              year_prescribed_working_days: {
                value: '240'
              },
              daily_prescribed_working_hours: {
                hour: {
                  value: '7'
                },
                minute: {
                  value: '30'
                }
              },
              closing_date: {
                value: '30'
              },
              pay_date: {
                value: '25',
                pay_month: 'next_month'
              }
            },
            allowances: {
              base_salary: {
                value: '250000'
              },
              position_allowance: {
                value: '30000'
              },
              qualification_allowance: {
                value: '4000'
              },
              housing_allowance: {
                value: '12000',
                is_uniform: false
              },
              commuting_allowance: {
                value: '2500',
                is_uniform: false,
                pay_unit: '1month'
              },
              other_allowance: [
                {
                  name: '家族手当'
                }
              ],
              allowances: {
                other_allowance: [
                  {
                    value: '10000',
                    pay_unit: '1month',
                    is_related_labor: false,
                    is_uniform: false
                  }
                ]
              }
            },
            attendances: [
              {
                value: '45',
                attendance_name: 'overtime'
              },
              {
                value: '70',
                attendance_name: 'overtime'
              },
              {
                value: '30',
                attendance_name: 'overtime'
              },
              {
                value: '148',
                attendance_name: 'overtime'
              },
              {
                value: '85',
                attendance_name: 'overtime'
              },
              {
                value: '90',
                attendance_name: 'overtime'
              },
              {
                value: '240',
                attendance_name: 'overtime'
              },
              {
                attendance_name: 'late_night',
                value: '45'
              },
              {
                attendance_name: 'legal_holiday',
                value: '500'
              }
            ]
          }.with_indifferent_access
        end

        it '正しく計算されること' do
          expect(described_class.new.calculate_extra_pay_amount(params)).to eq 51_679
        end
      end
    end

    context '1年間の所定労働日数が設定されていません' do
      let(:params) do
        {
          labor_regulations: {
            daily_prescribed_working_hours: {
              hour: {
                value: '8'
              }
            }
          },
          allowances: {
            base_salary: {
              value: '225000'
            }
          }
        }.with_indifferent_access
      end

      it 'エラーになること' do
        expect do
          described_class.new.calculate_extra_pay_amount(params)
        end.to raise_error(RuntimeError, '1年間の所定労働日数が設定されていません')
      end
    end

    context '1年間の所定労働時間が設定されていません' do
      let(:params) do
        {
          labor_regulations: {
            year_prescribed_working_days: {
              value: '252'
            }
          },
          allowances: {
            base_salary: {
              value: '225000'
            }
          }
        }.with_indifferent_access
      end

      it 'エラーになること' do
        expect do
          described_class.new.calculate_extra_pay_amount(params)
        end.to raise_error(RuntimeError, '1年間の所定労働時間が設定されていません')
      end
    end
  end
end

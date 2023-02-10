# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Practices', type: :request do
  describe 'POST /practices/practice1' do
    let(:params) do
      { base_salary: { value: '320000' },
        position_allowance: { value: '70000' },
        housing_allowance: { value: '35000', is_uniform: false },
        commuting_allowance: { value: '14000', is_uniform: false, pay_unit: '1month' } }.with_indifferent_access
    end

    it 'Status 200' do
      post(practices_practice1_path, params:)
      expect(response).to have_http_status(200)
    end
  end
end

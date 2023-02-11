# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Practices', type: :request do
  describe 'POST /practices/practice1' do
    let(:params) do
      {
        pay_deduction_params: {
          base_salary: { value: '320000' }
        }
      }.with_indifferent_access
    end

    it 'Status 200' do
      post(practices_practice1_path, params:)
      expect(response).to have_http_status(200)
    end
  end
end

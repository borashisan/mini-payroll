# frozen_string_literal: true

class TestsController < ApplicationController
  def fetch
    random_number = (1..100).to_a.sample
    random_string = %w[hoge foo bar baz].sample
    test_object = { id: random_number, test: random_string }
    render json: test_object
  end
end

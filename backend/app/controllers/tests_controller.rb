class TestsController < ApplicationController
  def test
    test_object = { id: 1, test: "test" }
    render json: test_object
  end
end

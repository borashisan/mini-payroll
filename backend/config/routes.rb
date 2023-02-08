# frozen_string_literal: true

Rails.application.routes.draw do
  get 'tests/fetch'

  post 'practices/practice1'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

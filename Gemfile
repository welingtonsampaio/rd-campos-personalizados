source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.1'
gem 'rack-cors'
gem 'puma', '~> 3.0'
gem 'paranoia', '~> 2.2'
gem 'devise'
gem 'devise_token_auth'
gem 'pg'
gem 'pundit'
gem 'rabl'
gem 'rails_12factor', group: :production

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'guard-bundler'
  gem 'guard-rails'
  gem 'guard-rspec'
  gem 'guard-rubocop'

  gem 'rb-fchange', require: false
  gem 'rb-fsevent', require: false
  gem 'rb-inotify', require: false
end

group :development, :test do
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'rubocop', '~> 0.46.0', require: false
  gem 'webmock'

  gem 'byebug', platform: :mri
  gem 'factory_girl_rails'
  gem 'ffaker'
  gem 'rspec-rails'
end

group :test do
  gem 'simplecov', :require => false
  gem 'rails-controller-testing'
  gem 'shoulda-matchers', '~> 3.1'
  gem 'pundit-matchers', '~> 1.1.0'
  gem 'database_cleaner'
  gem 'launchy'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

if (ARGV.last.start_with?('spec') && ARGV.last == 'spec') || ENV.fetch('TRAVIS_RUNNING') { false }
  require 'simplecov'
  SimpleCov.start 'rails' do
    add_filter 'vendor/ruby'
    add_filter 'spec'
  end
end

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort('The Rails environment is running in production mode!') if Rails.env.production?

require 'rspec/rails'
require 'shoulda-matchers'
require 'database_cleaner'
require 'ffaker'
require 'webmock/rspec'
require 'devise'
require 'pundit/rspec'
require 'pundit/matchers'

WebMock.disable_net_connect!(allow_localhost: true)

ActiveRecord::Migration.maintain_test_schema!

# This will load all support files inside support folder. Be aware
# that by doing this we're putting a major load during requires, only use by
# confort or if it's really necessary. Otherwise, require files one by one

Dir[File.join(File.dirname(__FILE__), 'support/**/*.rb')].each { |f| require f }

# Inclui todos os arquivos de factories presentes na pasta factories
# Dir[File.join(File.dirname(__FILE__), 'factories/**/*.rb')].each { |f| load File.expand_path(f) }

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include Requests::JsonHelpers
  config.include Requests::AuthHelper
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Pundit::RSpec::Matchers
  # config.extend ControllerMacros, type: :controller

  config.infer_spec_type_from_file_location!

  # Rspec configuration
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  # Mocks configuration
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.order = :random

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # Capybara javascript drivers require transactional fixtures set to false, and we use DatabaseCleaner
  # to cleanup after each test instead.  Without transactional fixtures set to false the records created
  # to setup a test will be unavailable to the browser, which runs under a separate server instance.
  config.use_transactional_fixtures = false

  # Ensure Suite is set to use transactions for speed.
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end
  config.before(:each) do
    DatabaseCleaner.start
  end
  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.fail_fast = ENV['FAIL_FAST'] || false
end

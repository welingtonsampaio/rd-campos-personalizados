class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :authenticate_user!, if: proc { |c| c.controller_name != 'sessions' }
  include PunditHelper
end

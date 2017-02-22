module Requests
  module JsonHelpers
    attr_reader :response
    def json
      JSON.parse response.body
    end
  end

  module AuthHelper
    def auth_request(user)
      sign_in user
      request.headers.merge!(user.create_new_auth_token)
    end
  end
end

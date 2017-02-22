require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :routing do
  describe 'routing' do

    it 'routes to #index' do
      expect(get: '/api/v1/me').to route_to(controller: 'api/v1/users',
                                            action: 'me',
                                            format: :json)
    end
  end
end

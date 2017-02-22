require 'rails_helper'

RSpec.describe Api::V1::ContactsController, type: :routing do
  describe 'routing' do

    it 'routes to #index' do
      expect(get: '/api/v1/contacts').to route_to(controller: 'api/v1/contacts',
                                                  action: 'index',
                                                  format: :json)
    end

    it 'routes to #show' do
      expect(get: '/api/v1/contacts/1').to route_to(controller: 'api/v1/contacts',
                                                    action: 'show',
                                                    id: '1',
                                                    format: :json)
    end

    it 'routes to #create' do
      expect(post: '/api/v1/contacts').to route_to(controller: 'api/v1/contacts',
                                                   action: 'create',
                                                   format: :json)
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/v1/contacts/1').to route_to(controller: 'api/v1/contacts',
                                                    action: 'update',
                                                    id: '1',
                                                    format: :json)
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/v1/contacts/1').to route_to(controller: 'api/v1/contacts',
                                                      action: 'update',
                                                      id: '1',
                                                      format: :json)
    end

    it 'routes to #destroy' do
      expect(delete: '/api/v1/contacts/1').to route_to(controller: 'api/v1/contacts',
                                                       action: 'destroy',
                                                       id: '1',
                                                       format: :json)
    end

  end
end

require 'rails_helper'

describe Api::V1::UsersController do
  render_views

  let(:current_user) { create(:user) }
  let(:second_user) { create(:user) }

  describe '#me' do
    it 'retrieve me info' do
      auth_request current_user
      get :me
      expect(json['id']).to eq current_user.id
      expect(json['name']).to eq current_user.name
    end

    it 'returns :unauthorized when not logged' do
      get :me
      expect(response.status).to eq 401
      expect(json['errors']).to include 'Authorized users only.'
    end
  end
end

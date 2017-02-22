require 'rails_helper'

describe Api::V1::CustomFieldsController do
  render_views

  let(:current_user) { create(:user) }
  let(:second_user) { create(:user) }

  before(:each) do
    auth_request current_user
  end

  describe '#index' do
    it 'returns all my custom_fields' do
      10.times { create(:custom_field, user_id: current_user.id) }

      get :index
      expect(json.count).to eq(10)
    end

    it 'should retrieve my data without custom_fields of other users' do
      10.times { create(:custom_field, user_id: current_user.id) }
      10.times { create(:custom_field, user_id: second_user.id) }

      get :index
      expect(json.pluck('user_id').uniq).to eq([current_user.id])
    end
  end

  describe '#show' do
    it 'show custom_field data' do
      custom_field = create(:custom_field, user_id: current_user.id)

      get :show, params: { id: custom_field.id }
      expect(response.status).to eq 200
      expect(json['label']).to eq custom_field.label
    end

    it 'not should be able catch custom_field from other user' do
      custom_field = create(:custom_field, user_id: second_user.id)

      get :show, params: { id: custom_field.id }
      expect(response.status).to eq 403
      expect(json['error']).to eq 'Not authorized'
    end
  end

  describe '#create' do
    let(:valid_params) do
      attributes_for(:custom_field)
    end

    let(:invalid_params) do
      attributes_for(:custom_field, label: nil)
    end

    it 'should create a custom_field' do
      post :create, params: { custom_field: valid_params }

      expect(json['user_id']).to eq current_user.id
      have_attributes valid_params
    end

    it 'should create a custom_field model combobox' do
      p = attributes_for(:custom_field_combobox)
      post :create, params: { custom_field: p }

      expect(json['user_id']).to eq current_user.id
      expect(json['options']).to eq p[:options]

      have_attributes valid_params
    end

    it 'not should be creates a custom_field' do
      post :create, params: { custom_field: invalid_params }

      expect(response.status).to eq 422
      expect(json.keys).to include 'label'
    end
  end

  describe '#update' do
    let(:valid_params) do
      attributes_for(:custom_field)
    end

    let(:invalid_params) do
      attributes_for(:custom_field, model: nil, label: nil)
    end

    let(:custom_field) { create(:custom_field, user_id: current_user.id) }

    it 'should update a custom_field' do
      c = custom_field.freeze
      vp = valid_params
      expect(c.label).to_not eq vp[:label]
      expect(c.model).to eq vp[:model] # default value text

      put :update, params: { id: c.id, custom_field: vp }

      expect(response.status).to eq 200

      expect(json['label']).to eq vp[:label]
      expect(json['model']).to eq vp[:model]

      have_attributes vp
    end

    it 'should update a custom_field to model combobox' do
      c = custom_field.freeze
      p = attributes_for(:custom_field_combobox)
      post :update, params: { id: c.id, custom_field: p }

      expect(json['user_id']).to eq current_user.id
      expect(json['options']).to eq p[:options]

      have_attributes valid_params
    end

    it 'not should update a custom_field from other user' do
      custom_field = create(:custom_field, user_id: second_user.id)
      put :update, params: { id: custom_field.id, custom_field: valid_params }

      expect(response.status).to eq 403
      have_attributes error: 'Not authorized'
    end

    it 'not should be updates a custom_field' do
      c = custom_field.freeze
      patch :update, params: { id: c.id, custom_field: invalid_params }

      expect(response.status).to eq 422
      expect(json.keys).to include 'label'
      expect(json.keys).to include 'model'
    end
  end

  describe '#destroy' do
    let(:custom_field) { create(:custom_field, user_id: current_user.id) }
    let(:custom_field2) { create(:custom_field, user_id: second_user.id) }

    it 'should destroy a custom_field' do
      delete :destroy, params: { id: custom_field.id }
      expect(response.status).to eq 204
      expect(CustomField.where(user: current_user).count).to eq 0
    end

    it 'not should be destroy a custom_field from other user' do
      custom_field
      delete :destroy, params: { id: custom_field2.id }
      expect(response.status).to eq 403
      expect(CustomField.where(user: current_user).count).to eq 1
      expect(CustomField.where(user: second_user).count).to eq 1
    end

    it 'should paranoid on destroy' do
      delete :destroy, params: { id: custom_field.id }
      expect(response.status).to eq 204
      expect(CustomField.where(user: current_user).with_deleted.count).to eq 1
    end
  end

end

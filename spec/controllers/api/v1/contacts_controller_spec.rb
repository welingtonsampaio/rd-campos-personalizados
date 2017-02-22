require 'rails_helper'

describe Api::V1::ContactsController do
  render_views

  let(:current_user) { create(:user) }
  let(:second_user) { create(:user) }

  before(:each) do
    auth_request current_user
  end

  describe '#index' do
    it 'returns all my contacts' do
      10.times { create(:contact, user_id: current_user.id) }

      get :index
      expect(json.count).to eq(10)
      # expect(json[0]).to be_a(Hash)
    end

    it 'should retrieve my data without contacts of other users' do
      10.times { create(:contact, user_id: current_user.id) }
      10.times { create(:contact, user_id: second_user.id) }

      get :index
      expect(json.pluck('user_id').uniq).to eq([current_user.id])
    end
  end

  describe '#show' do
    it 'show contact data' do
      contact = create(:contact, user_id: current_user.id)

      get :show, params: { id: contact.id }
      expect(response.status).to eq 200
      expect(json['email']).to eq contact.email
    end

    it 'not should be able catch contact from other user' do
      contact = create(:contact, user_id: second_user.id)

      get :show, params: { id: contact.id }
      expect(response.status).to eq 403
      expect(json['error']).to eq 'Not authorized'
    end
  end

  describe '#create' do
    let(:valid_params) do
      attributes_for(:contact)
    end

    let(:invalid_params) do
      attributes_for(:contact, email: nil)
    end

    let(:contact_complete) do
      create(:contact_with_custom_fields,
             create_field_content: false,
             user_id: current_user.id)
    end

    it 'should create a contact' do
      contact_complete
      post :create, params: { contact: valid_params }

      expect(json['user_id']).to eq current_user.id
      have_attributes valid_params
      expect(json['field_contents'].size).to eq CustomField.where(user: current_user).count
    end

    it 'should be create a contact and field_contents in one request' do
      field_contents = CustomField::MODELS.map do |m|
        options = m == 'combobox' ? %w(option1 option2) : nil
        fc_attributes = attributes_for(:field_content,
                                       contact_id: contact_complete.id,
                                       custom_field_id: CustomField.find_by(user_id: contact_complete.user_id).id,
                                       mode: m)
        fc_attributes[:value] = options[1] if m == 'combobox'
        fc_attributes
      end
      post :create, params: { contact: valid_params, field_contents: field_contents }
      expect(json['user_id']).to eq current_user.id
      expect(json['field_contents'].size).to eq CustomField.where(user_id: contact_complete.user_id).count
    end

    it 'not should be creates a contact' do
      post :create, params: { contact: invalid_params }

      expect(response.status).to eq 422
      expect(json.keys).to include 'email'
    end
  end

  describe '#update' do
    let(:valid_params) do
      {
        name: FFaker::NameBR.first_name,
        email: FFaker::Internet.free_email("n#{Time.now.to_i}")
      }
    end

    let(:invalid_params) do
      {
        name: FFaker::NameBR.first_name + 'a',
        email: ''
      }
    end

    let(:contact) { create(:contact, user_id: current_user.id) }

    it 'should update a contact' do
      c = contact.freeze
      vp = valid_params
      expect(c.name).to_not eq vp[:name]
      expect(c.email).to_not eq vp[:email]

      put :update, params: { id: c.id, contact: vp }

      expect(response.status).to eq 200

      expect(json['name']).to eq vp[:name]
      expect(json['email']).to eq vp[:email]

      have_attributes vp
    end

    it 'not should update a contact from other user' do
      contact = create(:contact, user_id: second_user.id)
      put :update, params: { id: contact.id, contact: valid_params }

      expect(response.status).to eq 403
      have_attributes error: 'Not authorized'
    end

    it 'not should be updates a contact' do
      c = contact.freeze
      patch :update, params: { id: c.id, contact: invalid_params }

      expect(response.status).to eq 422
      expect(json.keys).to include 'email'
    end
  end

  describe '#destroy' do
    let(:contact) { create(:contact, user_id: current_user.id) }
    let(:contact_complete) { create(:contact_with_custom_fields, user_id: current_user.id) }
    let(:contact2) { create(:contact, user_id: second_user.id) }

    it 'should destroy a contact' do
      delete :destroy, params: { id: contact.id }
      expect(response.status).to eq 204
      expect(Contact.where(user: current_user).count).to eq 0
    end

    it 'not should be destroy a contact from other user' do
      contact
      delete :destroy, params: { id: contact2.id }
      expect(response.status).to eq 403
      expect(Contact.where(user: current_user).count).to eq 1
      expect(Contact.where(user: second_user).count).to eq 1
    end

    it 'cascade destroy field_contents' do
      contact_complete

      expect(Contact.where(user: current_user).count).to_not eq 0
      expect(FieldContent.where(contact_id: contact_complete.id).count).to_not eq 0

      delete :destroy, params: { id: contact_complete.id }

      expect(response.status).to eq 204
      expect(Contact.where(user: current_user).count).to eq 0
      expect(FieldContent.where(contact_id: contact_complete.id).count).to eq 0
    end
  end
end

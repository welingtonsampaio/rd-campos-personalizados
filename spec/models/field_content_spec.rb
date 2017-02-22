require 'rails_helper'

RSpec.describe FieldContent, type: :model do

  let(:custom_field) { create(:custom_field, :with_user, required: true) }
  let(:contact) { create(:contact, user_id: custom_field.user.id) }
  let(:field_content) { create(:field_content, custom_field_id: custom_field.id, contact_id: contact.id) }

  describe '#validators' do
    it { should validate_presence_of(:contact_id) }
    it { should validate_presence_of(:custom_field_id) }

    it 'should validate that :value cannot be empty/falsy when :custom_field is required' do
      fc = field_content
      fc.value = nil
      expect(fc.valid?).to be_falsey
      expect(fc.errors.full_messages).to include('Value can\'t be blank')
    end

    it 'should validate that :model is either custom_field options' do
      options = %w(item1 item2 item3)
      custom_field = create(:custom_field, :with_user, model: 'combobox', options: options, required: true)
      contact = create(:contact, user_id: custom_field.user.id)
      field_content = build(:field_content, custom_field_id: custom_field.id, contact_id: contact.id)

      expect(field_content.valid?).to be_falsey
      expect(field_content.errors.full_messages).to include('Value is not included in the list')
      options.each do |option|
        field_content.value = option
        expect(field_content.valid?).to be_truthy
      end
    end
  end
end

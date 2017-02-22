require 'rails_helper'

RSpec.describe Contact, type: :model do

  describe '#Validators' do

    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).scoped_to(:user_id) }

    it 'should validate that :email format' do
      c = build(:contact, user: create(:user))
      c.email = 'invalid format'

      expect(c.valid?).to be_falsey
      expect(c.errors.full_messages).to include('Email is invalid')

      c.email = FFaker::Internet.free_email

      expect(c.valid?).to be_truthy
      expect(c.errors.full_messages).not_to include('Email is invalid')
    end

  end

end

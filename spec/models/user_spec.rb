require 'rails_helper'

RSpec.describe User, type: :model do

  describe 'validators' do
    it { is_expected.to validate_presence_of(:email) }
  end

  describe '.devise' do
    [
      :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
    ].each do |m|
      it { should be_kind_of(Devise::Models.const_get(m.to_s.classify)) }
    end

    it 'should loaded modules' do
      [
        :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
      ].each { |m| expect(User.devise_modules).to include(m) }
    end
  end
end

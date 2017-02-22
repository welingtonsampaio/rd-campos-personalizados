require 'rails_helper'

RSpec.describe ContactPolicy do
  subject { described_class.new(user, contact) }
  let(:scope) { Contact.where(user: user) }

  let(:user) { create(:user) }
  let(:contact) { create(:contact, user: user) }

  permissions '.scope' do
    subject(:policy_scope) { ContactPolicy::Scope.new(user, scope).resolve }

    context 'for an ordinary user' do

      it 'Show only contact of user' do
        c = contact
        create(:contact, user_id: create(:user).id)
        expect(policy_scope).to eq [c]
      end

      it 'Do not showing contacts from others users' do
        10.times do
          create(:contact, user_id: create(:user).id)
        end
        expect(policy_scope).to eq []
      end

    end
  end

  describe 'Public access' do
    let(:user) { User.new }

    describe 'index?' do
      let(:contact) { Contact.all }
      it { is_expected.to forbid_action(:index) }
    end

    it { is_expected.to forbid_action(:show) }
    it { is_expected.to forbid_action(:create) }
    it { is_expected.to forbid_action(:update) }
    it { is_expected.to forbid_action(:destroy) }
  end

  describe 'Private access' do
    describe 'index?' do
      let(:contact) { Contact.all }
      before(:each) { create(:contact, user: user) }
      it { is_expected.to permit_action(:index) }
    end

    it { is_expected.to permit_action(:show) }
    it { is_expected.to permit_action(:create) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }
  end
end

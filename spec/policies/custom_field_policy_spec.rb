require 'rails_helper'

RSpec.describe CustomFieldPolicy do
  subject { described_class.new(user, resource) }
  let(:scope) { klass.where(user: user) }

  let(:klass)   { CustomField }
  let(:factory) { :custom_field }

  let(:user) { create(:user) }
  let(:resource) { create(factory, user: user) }

  permissions '.scope' do
    subject(:policy_scope) { described_class::Scope.new(user, scope).resolve }

    context 'for an ordinary user' do

      it 'Show only contact of user' do
        r = resource
        create(factory, user_id: create(:user).id)
        expect(policy_scope).to eq [r]
      end

      it 'Do not showing contacts from others users' do
        10.times do
          create(factory, user_id: create(:user).id)
        end
        expect(policy_scope).to eq []
      end

    end
  end

  describe 'Public access' do
    let(:user) { User.new }

    describe 'index?' do
      let(:resource) { klass.all }
      it { is_expected.to forbid_action(:index) }
    end

    it { is_expected.to forbid_action(:show) }
    it { is_expected.to forbid_action(:create) }
    it { is_expected.to forbid_action(:update) }
    it { is_expected.to forbid_action(:destroy) }
  end

  describe 'Private access' do
    describe 'index?' do
      let(:resource) { klass.all }
      before(:each) { create(factory, user: user) }
      it { is_expected.to permit_action(:index) }
    end

    it { is_expected.to permit_action(:show) }
    it { is_expected.to permit_action(:create) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }
  end
end

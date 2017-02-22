require 'rails_helper'

RSpec.describe ApplicationPolicy do
  subject { described_class.new(user, contact) }
  let(:scope) { User.all }
  let(:user) { create(:user) }
  let(:contact) { create(:contact, user: user) }

  describe 'index?' do
    let(:contact) { User.all }
    it { is_expected.to forbid_action(:index) }
  end

  describe 'index?' do
    let(:user) { User.new }
    it { is_expected.to forbid_action(:show) }
  end

  it { is_expected.to forbid_action(:new) }
  it { is_expected.to forbid_action(:edit) }
  it { is_expected.to forbid_action(:create) }
  it { is_expected.to forbid_action(:update) }
  it { is_expected.to forbid_action(:destroy) }

end

require 'rails_helper'

RSpec.describe CustomField, type: :model do
  describe '#Validators' do

    it { should validate_presence_of(:label) }
    it { should validate_presence_of(:model) }
    it { should validate_uniqueness_of(:label).scoped_to(:user_id) }
    it { should validate_inclusion_of(:model).in_array(%w(text textarea combobox)) }

  end
end

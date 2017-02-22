class CustomField < ApplicationRecord
  acts_as_paranoid
  serialize :options, JSON

  MODELS = %w(text textarea combobox).freeze

  belongs_to :user

  validates_presence_of :label, :model
  validates_uniqueness_of :label, scope: :user_id
  validates_inclusion_of :model, in: MODELS
end

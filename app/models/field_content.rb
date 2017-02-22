class FieldContent < ApplicationRecord
  belongs_to :contact
  belongs_to :custom_field

  validates_presence_of :contact_id, :custom_field_id
  validates_presence_of :value,
                        if: proc { |fc| fc.custom_field && fc.custom_field.required }
  validates_inclusion_of :value,
                         in: proc { |fc| fc.custom_field && fc.custom_field.options },
                         if: proc { |fc| fc.custom_field && fc.custom_field.model == 'combobox' }
end

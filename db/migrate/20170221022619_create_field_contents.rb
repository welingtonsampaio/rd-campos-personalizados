class CreateFieldContents < ActiveRecord::Migration[5.0]
  def change
    create_table :field_contents do |t|
      t.string :value
      t.references :contact, foreign_key: true
      t.references :custom_field, foreign_key: true

      t.timestamps
    end
  end
end

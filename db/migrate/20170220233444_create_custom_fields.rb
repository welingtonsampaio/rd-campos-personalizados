class CreateCustomFields < ActiveRecord::Migration[5.0]
  def change
    create_table :custom_fields do |t|
      t.string :label
      t.string :model
      t.string :options
      t.boolean :required, default: false
      t.integer :order, default: 99
      t.datetime :deleted_at
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :custom_fields, :deleted_at
  end
end

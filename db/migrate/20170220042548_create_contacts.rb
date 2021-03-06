class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :contacts, :email
  end
end

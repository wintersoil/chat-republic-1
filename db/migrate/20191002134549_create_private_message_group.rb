class CreatePrivateMessageGroup < ActiveRecord::Migration[5.2]
  def change
    create_table :private_message_groups do |t|
      t.references :user, index:true, foreign_key: true
      t.references :recipient, references: :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end

class EditPrivateMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :private_messages, :recipient_id, :integer
  end
end

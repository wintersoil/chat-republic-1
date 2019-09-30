class UpdatePrivateMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :private_messages, :recipient, :integer
  end
end

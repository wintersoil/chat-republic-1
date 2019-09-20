class AddMp3tToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :mp3, :string
  end
end

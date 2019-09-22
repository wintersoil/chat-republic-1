class Addmp4ToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :mp4, :string
  end
end

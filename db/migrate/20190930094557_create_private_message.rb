class CreatePrivateMessage < ActiveRecord::Migration[5.2]
  def change
    create_table :private_messages do |t|
      t.belongs_to :user, index:true
      t.string :body
      t.string :mp3
      t.string :mp4
      t.timestamps
    end
  end
end

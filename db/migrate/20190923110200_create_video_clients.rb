class CreateVideoClients < ActiveRecord::Migration[5.2]
  def change
    create_table :video_clients do |t|
      t.references :user, index: true
      t.references :client, references: :user
      t.timestamps
    end
  end
end

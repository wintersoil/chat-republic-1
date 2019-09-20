class Message < ApplicationRecord

  belongs_to :user
  validates :body, presence: true
  mount_uploader :mp3, Mp3Uploader

end

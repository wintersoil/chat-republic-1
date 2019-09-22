class User < ApplicationRecord

  validates :first_name, :last_name, :user_name, :email, presence: true
  validates_format_of :email, with: /\A([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})\z/i
  validates_uniqueness_of :user_name
  has_secure_password
  has_many :messages
  mount_uploader :profile_picture, PictureUploader

  def appear
    self.update(online: true)
    ActionCable.server.broadcast "appearance_channel", {event: 'appear', user_id: self.id}
  end

  def disappear

  end

  def away
  end

end

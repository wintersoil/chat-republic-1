class User < ApplicationRecord

  validates :first_name, :last_name, :user_name, :email, presence: true
  validates_format_of :email, with: /\A([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})\z/i
  validates_uniqueness_of :user_name
  has_secure_password
  has_many :messages
  mount_uploader :profile_picture, PictureUploader

  def appear(data)
    self.update(online: true, current_room: data['on'])
    ActionCable.server.broadcast "AppearanceChannel", {event: 'appear', user_id: self.id, room: self.current_room}
  end

  def disappear

  end

  def away
  end

end

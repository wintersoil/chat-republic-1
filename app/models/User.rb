class User < ApplicationRecord

  validates :first_name, :last_name, :user_name, :email, presence: true
  validates_format_of :email, with: /\A([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})\z/i
  validates_uniqueness_of :user_name
  has_secure_password
  has_many :messages
  has_many :clients
  mount_uploader :profile_picture, PictureUploader

  def appear(controller,action)
    self.update(online: true)
    users = User.all
    all_online = users.select do |elm|
      elm.online?
    end
    only_relevant = []
    all_online.each do |elm|
      only_relevant.push({event: 'appear', user_id: elm.id, first_name: elm.first_name, last_name: elm.last_name, controller: controller, action: action})
    end
    ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

  def disappear(controller,action)
    self.update(online: false)
    ActionCable.server.broadcast "online_channel", {event: 'disappear', user_id: self.id, controller: controller, action: action}
  end

  def away
  end

end

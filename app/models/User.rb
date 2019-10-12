class User < ApplicationRecord

  validates :first_name, :last_name, :user_name, :email, presence: true
  validates_format_of :email, with: /\A([^\s]+)((?:[-a-z0-9]\.)[a-z]{2,})\z/i
  validates_uniqueness_of :user_name
  has_secure_password
  has_many :messages
  has_many :clients
  mount_uploader :profile_picture, PictureUploader

  def appear
    self.update(online: true)
    #users = User.all
    #only_relevant = []
    #only_relevant.push({event: 'appear', user_id: self.id, first_name: self.first_name, last_name: self.last_name, modded_message: onlinehomepage_render(self), controller: controller })
    #ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

  def disappear
    self.update(online: false)
    ActionCable.server.broadcast "online_channel", {event: 'disappear', user_id: self.id}
  end

  def away
  end

  def onlinehomepage_render(user)
    ac = ActionController::Base.new()
    ac.render_to_string(partial: 'layouts/onlinehomepage', locals: {user: user})
  end

end

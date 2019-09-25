class ChatController < ApplicationController

  def index
    @users = User.all
    all_online = @users.select do |elm|
      elm.online?
    end
    only_relevant = []
    all_online.each do |elm|
      only_relevant.push({event: 'appear', user_id: elm.id})
    end
    ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

end

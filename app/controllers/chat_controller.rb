class ChatController < ApplicationController

  def index
    stream_from "online_channel"
    current_user.appear
    @users = User.all
  end

end

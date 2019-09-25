class ChatController < ApplicationController

  def index
    current_user.appear
    @users = User.all
  end

end

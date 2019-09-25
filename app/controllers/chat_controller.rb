class ChatController < ApplicationController
after_action :broadcasting_online, only: :index

  def index
    @users = User.all
  end

  private

  def broadcasting_online
    current_user.appear
  end

end

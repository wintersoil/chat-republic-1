class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    current_user.is_online = 1
    stream_from "chatroom_channel"
  end

  def unsubscribed
    current_user.is_online = 0
    # Any cleanup needed when channel is unsubscribed
  end

  def current_user
    @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
  end
  
end

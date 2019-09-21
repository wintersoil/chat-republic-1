class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    current_user.is_online = 1
    current_user.save
    ActionCable.server.broadcast "chatroom_channel", online: {user_name: current_user.user_name, first_name: current_user.first_name, last_name: current_user.last_name}
    stream_from "chatroom_channel"
  end

  def unsubscribed
    current_user.is_online = 0
    current_user.save
    ActionCable.server.broadcast "chatroom_channel", offline: {user_name: current_user.user_name, first_name: current_user.first_name, last_name: current_user.last_name}
    # Any cleanup needed when channel is unsubscribed
  end

end

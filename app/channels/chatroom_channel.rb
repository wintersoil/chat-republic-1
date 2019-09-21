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
end

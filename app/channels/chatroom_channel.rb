class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @user.is_online = 1
    stream_from "chatroom_channel"
  end

  def unsubscribed
    @user.is_online = 0
    # Any cleanup needed when channel is unsubscribed
  end
end

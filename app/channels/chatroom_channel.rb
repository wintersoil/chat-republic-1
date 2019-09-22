class ChatroomChannel < ApplicationCable::Channel

  @@arraying = []

  def subscribed
    # stream_from "some_channel"
    stream_from "chatroom_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def online_render(arraying)
  end

end

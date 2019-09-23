class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for current_user

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def handle_messages(data)
    @client = User.find(data.client)
    @user = User.find(data.id)
    VideoChannel.broadcast_to(@client, { image: data.image })
    VideoChannel.broadcast_to(@user, { image: data.image })
  end
end

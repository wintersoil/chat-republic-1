class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from current_user.user_name

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def handle_messages(data)
    @client = User.find(data.data.client)
    @user = User.find(data.data.id)
    VideoChannel.broadcast_to(@client, data: { image: data.data.image })
    VideoChannel.broadcast_to(@user, data: { image: data.data.image })
  end
end

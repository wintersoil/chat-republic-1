class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for current_user.user_name

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def handle_messages(data)
    puts data
    @client = User.find(data.client)
    @user = User.find(data.id)
    VideoChannel.broadcast_to(@client.user_name, { image: data.image })
    VideoChannel.broadcast_to(@user.user_name, { image: data.image })
  end
end

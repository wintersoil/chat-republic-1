class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "#{self.channel_name}:#{current_user.to_gid_param}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def user
    User.find_by(id: params[:id])
  end

  def handle_messages(data)
    @client = User.find(data.data.client)
    stream_from "#{self.channel_name}:#{@client.to_gid_param}"
    @user = User.find(data.data.id)
    VideoChannel.broadcast("#{self.channel_name}:#{current_user.to_gid_param}", data: { image: data.data.image })
    VideoChannel.broadcast("#{self.channel_name}:#{@client.to_gid_param}", data: { image: data.data.image })
  end
end

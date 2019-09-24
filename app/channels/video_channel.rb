class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "#{self.channel_name}:#{current_user.to_gid_param}"
    @videoClient = VideoClient.find_by(user: current_user)
    @client = User.find(@videoClient.client_id)
    stream_from "#{self.channel_name}:#{@client.to_gid_param}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def user
    User.find_by(id: params[:id])
  end

  def handle_messages(data)
    VideoChannel.broadcast("#{self.channel_name}:#{current_user.to_gid_param}", data: { image: data.data.image })
    @videoClient = VideoClient.find_by(user: current_user)
    @client = User.find(@videoClient.client_id)
    VideoChannel.broadcast("#{self.channel_name}:#{@client.to_gid_param}", data: { image: data.data.image })
  end
end

class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "video_channel"

    #stream_from "#{self.channel_name}:#{current_user.to_gid_param}"
    #@videoClient = VideoClient.find_by(user: current_user)
    #@client1 = User.find(@videoClient.client_id)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    #stop_all_streams
  end

  def handle_messages(data)
    ActionCable.server.broadcast("video_channel", data)
    #@videoClient = VideoClient.find_by(user: current_user)
    #@client1 = User.find(@videoClient.client_id)
    #VideoChannel.broadcast("#{self.channel_name}:#{@client1.to_gid_param}", data: { image: data["image"] })
  end
end

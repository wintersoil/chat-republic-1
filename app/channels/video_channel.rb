class VideoChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "#{self.channel_name}:#{current_user.to_gid_param}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def handle_messages(data)
    @client1 = User.find(data['receiver_id'])
    ActionCable.server.broadcast("#{self.channel_name}:#{@client1.to_gid_param}", data)
  end
end

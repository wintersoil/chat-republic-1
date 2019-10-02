class PrivateChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{self.channel_name}:#{current_user.to_gid_param}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

class OnlineChannel < ApplicationCable::Channel
  def subscribed
    stream_from "online_channel"
    current_user.appear
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

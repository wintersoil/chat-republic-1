class OnlineChannel < ApplicationCable::Channel
  def subscribed
    stream_from "online_channel"
    controller = ApplicationController.params[:controller]
    action = ApplicationController.params[:action]
    current_user.appear(controller,action)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stream_from "online_channel"
    controller = ApplicationController.params[:controller]
    action = ApplicationController.params[:action]
    current_user.disappear(controller,action)
  end
end

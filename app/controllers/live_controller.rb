class LiveController < ApplicationController
  before_action :require_logged_in_user, :notify_online_controller_action

  def new
    @users = User.all
  end

  def notify_online_controller_action
    action = params[:action]
    controller = params[:controller]
    only_relevant = []
    only_relevant.push({event: 'appear', user_id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, controller: controller, action: action})
    ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

end

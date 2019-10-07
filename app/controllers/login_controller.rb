class LoginController < ApplicationController
  before_action :notify_online_controller_action

  def new
  end

  def create
    user = User.find_by(user_name: params[:session][:user_name])
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:success] = "You have successfully logged in."
      redirect_to root_path
    else
      flash[:success] = "You could not be logged in. Please check your username and password and try again."
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = "You have been successfully logged out."
    redirect_to root_path
  end

  def notify_online_controller_action
    if(logged_in?)
      action = params[:action]
      controller = params[:controller]
      only_relevant = []
      only_relevant.push({event: 'appear', user_id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, controller: controller, action: action})
      ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
    end
  end

end

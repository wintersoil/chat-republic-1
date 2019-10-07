class SignupController < ApplicationController
  before_action :notify_online_controller_action

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "New account has been created. You can sign on using #{@user.user_name} and your password."
      redirect_to login_path
    else
      flash[:success] = "User account could not be created please try again!"
      render "new"
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :user_name, :email, :password)
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

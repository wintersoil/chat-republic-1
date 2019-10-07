class ProfileController < ApplicationController
  before_action :notify_online_controller_action

  def new
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      flash[:success] = "Your profile has been updated!"
      redirect_to profile_path(@user)
    else
      flash.now[:success] = "Your profile could not be updated!"
      render "new"
    end
  end

  def uploadprofilepicture
    @user = current_user
    if @user.profile_picture.present?
      @user.profile_picture.file.delete
    else
    end
    if @user.update(user_params)
      flash[:success] = "Your profile picture has been updated"
      redirect_to profile_path(@user)
    else
      flash[:success] = "Your profile picture could not be updated"
      render "new"
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :user_name, :email, :password, :profile_picture)
  end

  def notify_online_controller_action
    action = params[:action]
    controller = params[:controller]
    only_relevant = []
    only_relevant.push({event: 'appear', user_id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, controller: controller, action: action})
    ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

end

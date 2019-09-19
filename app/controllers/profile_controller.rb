class ProfileController < ApplicationController

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

end

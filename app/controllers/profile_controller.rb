class ProfileController < ApplicationController

  def new
    @user = current_user
  end

  def update
    if @user.update(user_params)
      redirect_to profile_path(@user)
    else
      render "new"
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :user_name, :email, :password)
  end

end

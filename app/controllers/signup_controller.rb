class SignupController < ApplicationController

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

end

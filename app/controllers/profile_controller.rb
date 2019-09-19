class ProfileController < ApplicationController

  def new
    @user = current_user
  end

  def update
    if @user.save
      redirect_to profile_path
    else
      redirect_to profile_path
    end
  end

end

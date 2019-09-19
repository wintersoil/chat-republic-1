class ProfileController < ApplicationController

  def new
    @user = current_user
  end

  def update
    if @user.save
      redirect_to profile_path(@user)
    else
      render "new"
    end
  end

end

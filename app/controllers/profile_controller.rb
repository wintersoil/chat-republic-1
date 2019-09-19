class ProfileController < ApplicationController

  def new
    @user = current_user
  end

  def editpassword
    if @user.save
      redirect_to profile_path
    else
      redirect_to profile_path
    end
  end

end

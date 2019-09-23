class LiveController < ApplicationController
  before_action :require_logged_in_user

  def new
    @users = User.all
  end


end

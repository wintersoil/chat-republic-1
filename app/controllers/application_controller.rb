class ApplicationController < ActionController::Base

  helper_method :logged_in?, :current_user, :require_logged_in_user, :is_owner?, :remove_from_chatroom
  before_action :set_variables

  def logged_in?
    return !!current_user
  end

  def current_user
    @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
  end

  def require_logged_in_user
    if !logged_in?
      redirect_to login_path
    end
  end

  def is_owner?
    if logged_in?
      return current_user.user_name == "wintersoil"
    else
      return false
    end
  end


  def set_variables
    @current_on_chatroom = []
  end

  def remove_from_chatroom
    if logged_in?
      @current_on_chatroom.delete_at(@current_on_chatroom.index(current_user))
    end
  end

end

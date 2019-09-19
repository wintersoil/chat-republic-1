class ApplicationController < ActionController::Base

  helper_method :logged_in?, :current_user, :require_logged_in_user, :is_owner?

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
    return current_user.user_name == "wintersoil"
  end

end

class ApplicationController < ActionController::Base

  helper_method :logged_in?, :current_user, :require_logged_in_user, :is_owner?, :remove_from_chatroom, :add_to_chatroom, :read_from_chatroom

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

  def initialize
    super
    $cache = Redis.new(host:"localhost")
    empty_arraying = []
    $cache.set('current_on_chatroom', empty_arraying.to_json)
  end

  def remove_from_chatroom
    current_on_chatroom = JSON.parse($cache.hget('current_on_chatroom'))
    if logged_in? && current_on_chatroom.include?(current_user)
      current_on_chatroom.delete_at(current_on_chatroom.index(current_user))
    end
    $cache.hmset('current_on_chatroom', current_on_chatroom.to_json)
  end

  def add_to_chatroom
    current_on_chatroom = JSON.parse($cache.hget('current_on_chatroom'))
    if logged_in? && current_on_chatroom.include?(current_user) == false
      current_on_chatroom.push(current_user)
    end
    $cache.hmset('current_on_chatroom', current_on_chatroom.to_json)
  end

  def read_from_chatroom
    current_on_chatroom = JSON.parse($cache.hget('current_on_chatroom'))
    return current_on_chatroom
  end

end

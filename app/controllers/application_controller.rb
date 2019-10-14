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
    puts("New chatroom array created...")
  end

  def remove_from_chatroom
    current_on_chatroom = JSON.parse($cache.get('current_on_chatroom'))
    puts("Removing from chatroom   " + current_on_chatroom)
    if logged_in? && current_on_chatroom.include?(current_user.id)
      current_on_chatroom.delete_at(current_on_chatroom.index(current_user.id))
    end
    $cache.set('current_on_chatroom', current_on_chatroom.to_json)
  end

  def add_to_chatroom
    current_on_chatroom = JSON.parse($cache.get('current_on_chatroom'))
    puts("Adding to chatroom   " + current_on_chatroom)
    if logged_in? && current_on_chatroom.include?(current_user.id) == false
      current_on_chatroom.push(current_user.id)
    end
    $cache.set('current_on_chatroom', current_on_chatroom.to_json)
  end

  def read_from_chatroom
    current_on_chatroom = JSON.parse($cache.get('current_on_chatroom'))
    puts("Reading from chatroom   " + current_on_chatroom)
    all_online_chatroom_users = []
    current_on_chatroom.each do |id_num|
      all_online_chatroom_users.push(User.find(id_num))
    end
    return all_online_chatroom_users
  end

end

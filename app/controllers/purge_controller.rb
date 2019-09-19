class PurgeController < ApplicationController

  def deleting
    if is_owner?
      Message.delete_all
      flash[:success] = "All chatroom chats have been deleted!"
      redirect_to root_path
    else
      flash[:success] = "Chatroom chats could not be deleted!"
      redirect_to root_path
    end
  end

end

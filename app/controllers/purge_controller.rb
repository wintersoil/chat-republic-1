class PurgeController < ApplicationController

  def deleting
    if is_owner?
      Message.delete_all
      redirect_to root_path
    else
      redirect_to root_path
    end
  end

end

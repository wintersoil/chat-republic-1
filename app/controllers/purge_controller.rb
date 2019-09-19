class PurgeController < ApplicationController

  def deleting
    if is_owner?
      Message.delete_all
      redirect_to root_path
    else
    end
  end

end

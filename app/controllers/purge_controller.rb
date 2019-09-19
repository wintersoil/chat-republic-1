class PurgeController < ApplicationController

  def deleting
    Messages.delete_all
    redirect_to root_path
  end

end

class PurgeController < ApplicationController

  def deleting
    Message.delete_all
    redirect_to root_path
  end

end

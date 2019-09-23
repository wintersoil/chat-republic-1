class VideoController < ApplicationController

  def new
  end

  def create
    id = params[:id]
    client = User.find_by(id)
    @videoClient = new VideoClient(user: current_user, client: client)
    if @videoClient.save
      #broadcast to both users the link
      VideoChannel.broadcast_to(@videoClient.client, { notification: 'Test message' })
      VideoChannel.broadcast_to(@videoClient.user, { notification: 'Test message' })
      redirect_to video_path
    end
  end
  

end

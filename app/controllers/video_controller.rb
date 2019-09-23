class VideoController < ApplicationController

  def new
    id = params[:id]
    @client = User.find(id)
  end

  def create
    id = params[:id]
    @client = User.find(id)
    @videoClient = new VideoClient(user: current_user, client: @client)
    if @videoClient.save
      #broadcast to both users the link
      VideoChannel.broadcast_to(@videoClient.client, { notification: 'Test message' })
      VideoChannel.broadcast_to(@videoClient.user, { notification: 'Test message' })
      redirect_to video_path(@videoClient.client)
    end
  end

  def destroy
    id = params[:id]
    @client = User.find(id)
    @videoClient = VideoClient.find_by(user: current_user, client: @client)
    if @videoClient.destroy
      redirect_to live_path
    end
  end

end

class VideoController < ApplicationController

  def new
    id = params[:id]
    @client = User.find(id)
  end

  def create
    id = params[:id]
    @client = User.find(id)
    @videoClient = VideoClient.new(user: current_user, client_id: @client.id)
    if @videoClient.save
      #broadcast to both users the link
      VideoChannel.broadcast_to(@client, { notification: 'Test message' })
      VideoChannel.broadcast_to(@videoClient.user, { notification: 'Test message' })
      redirect_to video_new_path(@videoClient.client_id)
    end
    redirect_to video_new_path(@videoClient.client_id)

  end

  def destroy
    id = params[:id]
    @client = User.find(id)
    @videoClient = VideoClient.find_by(user: current_user, client: @client)
    if @videoClient.destroy
      redirect_to live_path
    end
  end

  def video_params
    params.require(:video_client).permit(:user, :client)
  end

end

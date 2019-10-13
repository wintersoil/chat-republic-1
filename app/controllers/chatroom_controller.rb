class ChatroomController < ApplicationController
  before_action :require_logged_in_user
  before_action :video_params, only: [:mp4video]
  after_action :notify_online_controller_action, only: [:new]


  def new
    #if @@current_on_chatroom.include?(current_user) == false
      #@@current_on_chatroom.push(current_user)
    @message = Message.new
    @messaging = Message.all
    @user = current_user
    @users = User.all
    render "new"
  end

  def create
    @message = Message.new(msg_params)
    @message.user = current_user
    @user = current_user
    @users = User.all
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: message_render(@message)
    else
    end
  end

  def mp3audio
    @message = Message.new(body: "msg")
    @message.user = current_user
    @user = current_user
    metadata_size = "data:audio/mp3;base64,".length
    audio = params[:data][metadata_size, params[:data].length]
    audio1 = Base64.decode64(audio)
    if @message.mp3.present?
      @message.mp3.file.delete
    else
    end
    s3 = Fog::AWS::Storage.new(:aws_access_key_id => ENV['S3_ACCESS_KEY'], :aws_secret_access_key => ENV['S3_SECRET_KEY'], :region => "ca-central-1")
    directory = s3.directories.get("aliphotoappimages")

    extension = 'mpeg'
    name = ('a'..'z').to_a.shuffle[0..7].join + ".#{extension}"
    data = audio1
    file = directory.files.create(:key => name,:body => data,:public => true)
    file.save
    url = file.public_url
    puts url
    @message.mp3 = url
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: mp3_message_render(@message)
    else
    end
  end

  #mp4 streaming
  def mp4video
    @message = Message.new(body: "mp4")
    @message.user = current_user
    @user = current_user
    metadata_size = "data:video/mp4;base64,".length
    audio = params[:video][:data][metadata_size, params[:video][:data].length]
    audio1 = Base64.decode64(audio)
    if @message.mp4.present?
      @message.mp4.file.delete
    else
    end
    s3 = Fog::AWS::Storage.new(:aws_access_key_id => ENV['S3_ACCESS_KEY'], :aws_secret_access_key => ENV['S3_SECRET_KEY'], :region => "ca-central-1")
    directory = s3.directories.get("aliphotoappimages")

    extension = 'mp4'
    name = ('a'..'z').to_a.shuffle[0..7].join + ".#{extension}"
    data = audio1
    file = directory.files.create(:key => name,:body => data,:public => true)
    file.save
    url = file.public_url
    puts url
    @message.mp4 = url
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: mp4_message_render(@message)
    else
    end
  end


  private

  def msg_params
    params.require(:message).permit(:body)
  end

  def video_params
     params.require(:video).permit(:data, :fname)
   end

  def message_render(message)
    render(partial: 'messages/message', locals: {msg: message})
  end

  def mp3_message_render(message)
    render(partial: 'messages/mp3message', locals: {msg: message})
  end

  def mp4_message_render(message)
    render(partial: 'messages/mp4message', locals: {msg: message})
  end

  def notify_online_controller_action
    action = params[:action]
    controller = params[:controller]
    only_relevant = []
    only_relevant.push({event: 'appear', user_id: current_user.id, first_name: current_user.first_name, last_name: current_user.last_name, controller: controller, action: action, chatroom_mod_message: onlinechatroom_render(current_user)})
    ActionCable.server.broadcast "online_channel", {arrayez: only_relevant}
  end

  def onlinechatroom_render(user)
    render_to_string(partial: 'layouts/onlinechatroom', locals: {usering: user})
  end

end

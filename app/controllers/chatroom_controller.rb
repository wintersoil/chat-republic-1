class ChatroomController < ApplicationController
  before_action :require_logged_in_user

  def new
    @message = Message.new
    @messaging = Message.all
    @user = current_user
  end

  def create
    @message = Message.new(msg_params)
    @message.user = current_user
    @user = current_user
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: message_render(@message)
    else
    end
  end

  def mp3audio
    @message = Message.new(msg_params)
    @message.body = params[:body]
    @message.user = current_user
    @user = current_user
    audio = params[:data]
    audio1 = Base64.decode64(audio)
    puts audio1
    if @message.mp3.present?
      @message.mp3.file.delete
    else
    end
    s3 = Fog::AWS::Storage.new(:aws_access_key_id => ENV['S3_ACCESS_KEY'], :aws_secret_access_key => ENV['S3_SECRET_KEY'], :region => "ca-central-1")
    directory = s3.directories.get("aliphotoappimages")

    extension = 'mp3'
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

  private

  def msg_params
    params.require(:message).permit(:body, :mp3)
  end

  def message_render(message)
    render(partial: 'messages/message', locals: {msg: message})
  end

  def mp3_message_render(message)
    render(partial: 'messages/mp3message', locals: {msg: message})
  end

end

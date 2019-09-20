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
    @message = Message.new(body: "mp3")
    @message.user = current_user
    @user = current_user
    audio = params[:blob]
    if @message.mp3.present?
      @message.mp3.file.delete
    else
    end
    s3 = AWS::S3.new(:access_key_id => ENV['S3_KEY'], :secret_access_key => ENV['S3_SECRET'])
    bucket = s3.buckets['aliphotoappimages']
    data = audio
    type = 'audio/mpeg-3'
    extension = 'mp3'
    name = ('a'..'z').to_a.shuffle[0..7].join + ".#{extension}"
    obj = bucket.objects.create(name,data,{content_type:type,acl:"public_read"})
    url = obj.public_url().to_s
    @message.mp3 = name
    if @message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: mp3_message_render(@message)
    else
    end
  end

  private

  def msg_params
    params.require(:message).permit(:body)
  end

  def message_render(message)
    render(partial: 'messages/message', locals: {msg: message})
  end

  def mp3_message_render(message)
    render(partial: 'messages/mp3message', locals: {msg: message})
  end

end

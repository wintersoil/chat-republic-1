class ProfileController < ApplicationController

  helper_method: is_file_exist?

  def new
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to profile_path(@user)
    else
      render "new"
    end
  end

  def uploadprofilepicture
    @user = current_user
    if @user.profile_picture
      @user.profile_picture.file.delete
    else
    end
    if @user.update(user_params)
      redirect_to profile_path(@user)
    else
      render "new"
    end
  end

  def  is_file_exist?(file)
    s3 = Aws::S3::Resource.new(
      region: ENV['S3_REGION'],
      credentials: {
        :provider => 'AWS',
        :aws_access_key_id => ENV['S3_ACCESS_KEY'],
        :aws_secret_access_key => ENV['S3_SECRET_KEY'],
      }
    )
    bucket =  s3.bucket('myphotoappimages')
    return bucket.object(file).exists?
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :user_name, :email, :password, :profile_picture)
  end

end

class SiteController < ApplicationController
  def index
    @user = User.new
    @users = User.all
  end


  def login
    @user = User.find_by(email: params[:email])

      if @user and @user.authenticate(params[:password])
        session[:user_id] = @user.id
        redirect_to root_url

      else
        flash.now.alert = 'Oops'
        render :index
      end
  end

  def logout
    session[:user_id] = nil
    redirect_to root_url
  end
end
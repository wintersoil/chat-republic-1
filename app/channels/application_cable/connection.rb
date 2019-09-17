module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :current_user    # creates a instance variable

        def connect
          session_from_cookie = cookies.encrypted[Rails.application.config.session_options[:key]]
          user_id = session_from_cookie['user_id']
          reject_unauthorized_connection if user_id.nil?
          self.current_user = User.find(user_id)
          Rails.logger.warn("connection for user #{current_user}")
          reject_unauthorized_connection if current_user.nil?
        end

        def disconnect
          # Any cleanup work needed when the cable connection is cut.
        end

  end
end

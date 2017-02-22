module Api
  module V1

    class UsersController < ApplicationController
      def me
        if current_user
          render json: current_user
        else
          render json: { error: 'not logged' }, status: :unauthorized
        end
      end
    end
  end
end

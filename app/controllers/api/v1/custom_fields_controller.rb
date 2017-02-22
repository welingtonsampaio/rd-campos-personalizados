module Api
  module V1

    class CustomFieldsController < ApplicationController
      before_action :set_custom_field, only: [:show, :update, :destroy]

      # GET /contacts
      def index
        @custom_fields = policy_scope CustomField.all
        authorize @custom_fields
        render json: @custom_fields
      end

      # GET /contacts/1
      def show
        authorize @custom_field
        render json: @custom_field
      end

      # POST /contacts
      def create
        @custom_field = CustomField.new(custom_field_params)
        @custom_field.user = current_user
        @custom_field.options = params[:custom_field][:options] if params[:custom_field][:options].present?
        authorize @custom_field

        if @custom_field.save
          render json: @custom_field, status: :created
        else
          render json: @custom_field.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /contacts/1
      def update
        authorize @custom_field
        @custom_field.update_attributes(custom_field_params)
        @custom_field.options = params[:custom_field][:options] if params[:custom_field][:options].present?
        if @custom_field.save
          render json: @custom_field
        else
          render json: @custom_field.errors, status: :unprocessable_entity
        end
      end

      # DELETE /contacts/1
      def destroy
        authorize @custom_field
        @custom_field.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_custom_field
        @custom_field = CustomField.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def custom_field_params
        params.require(:custom_field).permit(:label, :model, :required, :options, :order)
      end
    end
  end
end

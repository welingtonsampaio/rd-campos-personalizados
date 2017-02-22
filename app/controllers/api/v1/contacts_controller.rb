module Api
  module V1

    class ContactsController < ApplicationController
      before_action :set_contact, only: [:show, :update, :destroy]

      # GET /contacts
      def index
        @contacts = policy_scope Contact.all
        authorize @contacts
        render json: @contacts
      end

      # GET /contacts/1
      def show
        authorize @contact
        render json: @contact
      end

      # POST /contacts
      def create
        @contact = Contact.new(contact_params)
        @contact.user = current_user
        authorize @contact

        if @contact.save
          manipulate_field_contents
          render json: @contact, status: :created
        else
          render json: @contact.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /contacts/1
      def update
        authorize @contact
        if @contact.update(contact_params)
          manipulate_field_contents
          render json: @contact
        else
          render json: @contact.errors, status: :unprocessable_entity
        end
      end

      # DELETE /contacts/1
      def destroy
        authorize @contact
        @contact.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_contact
        @contact = Contact.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def contact_params
        params.require(:contact).permit(:name, :email)
      end

      def manipulate_field_contents
        return unless params[:field_contents].present?
        params[:field_contents].each do |ref, entry2|
          ref = entry2 unless ref.is_a?(ActionController::Parameters)
          fc = FieldContent.find_by contact: @contact,
                                    custom_field_id: ref[:custom_field_id]
          fc.update value: ref[:value] if fc
        end
      end
    end
  end
end

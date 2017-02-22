class Contact < ApplicationRecord
  belongs_to :user
  has_many :field_contents, dependent: :destroy

  validates_presence_of :email
  validates_uniqueness_of :email, scope: :user_id
  validates_format_of :email, with: Devise.email_regexp

  after_save :look_custom_fields

  def as_json(options = {})
    super(
      options.merge(
        include: {
          field_contents: {
            include: { custom_field: {} }
          }
        }
      )
    )
  end

  private

  def look_custom_fields
    CustomField.where(user: user).each do |cf|
      next if field_contents.find_by(custom_field: cf)
      FieldContent.create custom_field: cf,
                          contact: self,
                          value: cf.options? ? cf.options.first : nil
    end
  end
end

FactoryGirl.define do
  factory :field_content do
    transient do
      mode 'text'
    end

    value do
      case mode
      when 'text'
        FFaker::NameBR.male_prefix
      when 'textarea'
        FFaker::Lorem.sentences(3).join(' ')
      when 'select'
        FFaker::Lorem.word
      end
    end

    trait :with_contact do
      contact { create(:contact, :with_user) }
    end

    trait :with_custom_field do
      custom_field { create(:custom_field) }
    end
  end
end

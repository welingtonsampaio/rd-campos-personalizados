FactoryGirl.define do
  factory :contact do
    name FFaker::NameBR.name
    sequence :email do |n|
      "person#{n}@example.com"
    end

    trait :with_user do
      user { create(:user) }
    end

    factory :contact_with_custom_fields do
      transient do
        create_field_content true
      end

      after(:create) do |contact, evaluator|
        CustomField::MODELS.map do |m|
          options = m == 'combobox' ? %w(option1 option2) : nil
          cf = create(:custom_field,
                      model: m,
                      user_id: contact.user_id,
                      options: options)

          next unless evaluator.create_field_content
          fc_attributes = attributes_for(:field_content,
                                         contact_id: contact.id,
                                         custom_field_id: cf.id,
                                         mode: m)
          fc_attributes[:value] = options[1] if m == 'combobox'
          create(:field_content, fc_attributes)
        end
      end
    end
  end
end

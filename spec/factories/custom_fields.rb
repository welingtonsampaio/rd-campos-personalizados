FactoryGirl.define do
  factory :custom_field do
    sequence(:label) { |i| "Label #{i}" }
    model 'text'
    options nil
    required false
    order 1
    deleted_at nil

    factory :custom_field_combobox do
      model 'combobox'
      options %w(opt1 opt2 op3)
    end

    trait :with_user do
      user { create(:user) }
    end
  end
end

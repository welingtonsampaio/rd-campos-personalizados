if User.count == 0
  User.create name: 'Joao Cruz',
              email: 'joao.cruz@gmail.com',
              password: 12345678,
              password_confirmation: 12345678,
              confirmed_at: Time.now

  User.create name: 'Maria Souza',
              email: 'maria.souza@gmail.com',
              password: 12345678,
              password_confirmation: 12345678,
              confirmed_at: Time.now
end

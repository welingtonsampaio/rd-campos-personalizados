# RD - Custom Fields

[![Build Status](https://travis-ci.org/welingtonsampaio/rd-campos-personalizados.svg?branch=master)](https://travis-ci.org/welingtonsampaio/rd-campos-personalizados) [![Dependency Status](https://gemnasium.com/badges/github.com/welingtonsampaio/rd-campos-personalizados.svg)](https://gemnasium.com/github.com/welingtonsampaio/rd-campos-personalizados) [![Code Climate](https://codeclimate.com/github/welingtonsampaio/rd-campos-personalizados/badges/gpa.svg)](https://codeclimate.com/github/welingtonsampaio/rd-campos-personalizados) [![Test Coverage](https://codeclimate.com/github/welingtonsampaio/rd-campos-personalizados/badges/coverage.svg)](https://codeclimate.com/github/welingtonsampaio/rd-campos-personalizados/coverage)

This design is a step of the RD Selective Process.

To understand everything that was done. Read [History.md](https://github.com/welingtonsampaio/rd-campos-personalizados/blob/master/History.md), in it I tell the day-to-day development process

## Demo

Hosted in [Heroku](https://heroku.com) follow this link: [https://rd-campos-personalizados.herokuapp.com](https://rd-campos-personalizados.herokuapp.com)

Autofill user login ;).

## Requirements

The project can be developed through a UNIX development environment (MacOS or Linux)

* Ruby 2.2.3+
* Postgres
* Yarn

## Environment

Some variables that you must configure before you start writing your lines of code.

```bash
export DBHOST = '127.0.0.1'          # Optional
export DBPORT = 5432                 # Optional
export DBUSERNAME = 'sampaio'        # Optional
export DBPASSWORD = ''               # Optional
export DBDATABASE = 'rd_development' # Required
```


## Front-End

To compile and run the front end files, follow the steps below:

```bash
rm -rf public/*
cd client
yarn install
yarn start
```

These commands will clean the contents of the public folder. And start the webpack in watch mode to compile the files when necessary.

## Testes

This application uses __RSpec__ for development and __RuboCop__ for validation with the Ruby style guide and good practices. To run the tests use the following commands:

#### Local
```
bundle exec rspec spec
bundle exec rubocop
```

## Guard
The application supports __Guard__ and can be started using the following command:

```
$ bundle exec guard
```

The guard comes with the __rails, rspec__, and __bundle__ modules, running the guard, the server will restart, run the tests, install gems and migrate to the database whenever necessary.

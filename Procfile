web: bundle exec puma -C config/puma.rb
client: cd client && yarn install && NODE_ENV=production node_modules/.bin/webpack --progress --color -p --output ../public --config build/webpack.config.js

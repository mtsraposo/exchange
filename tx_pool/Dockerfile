FROM ruby:3.1.2

RUN bundle config --global frozen 1

WORKDIR /exchange/tx_pool

COPY Gemfile Gemfile.lock ./
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

COPY . .

# Configure the main process to run when running the image
CMD ["bundle", "exec", "rails", "s", "-p", "3000", "-b", "0.0.0.0"]
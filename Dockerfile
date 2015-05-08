FROM trenpixster/elixir:latest
MAINTAINER Chris Zhu <chris.zhu12@gmail.com>

RUN mkdir phoenixapp

WORKDIR phoenixapp

COPY ./mix.exs /phoenixapp/mix.exs
COPY ./mix.lock /phoenixapp/mix.lock

RUN mix deps.get

COPY ./ /phoenixapp

ENV PORT 8080
ENV MIX_ENV prod

RUN mix deps.compile

EXPOSE 8080

ENTRYPOINT mix ecto.migrate
ENTRYPOINT mix phoenix.server

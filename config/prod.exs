use Mix.Config

# For production, we configure the host to read the PORT
# from the system environment. Therefore, you will need
# to set PORT=80 before running your server.
#
# You should also configure the url host to something
# meaningful, we use this information when generating URLs.
config :chatty, Chatty.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [host: "example.com"]

# Configure your database
config :chatty, Chatty.Repo,
  adapter: Ecto.Adapters.Postgres,
  hostname: "postgres",
  username: "postgres",
  password: "2ubc4cheaters8",
  database: "chatty_prod"

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section:
#
#  config:chatty, Chatty.Endpoint,
#    ...
#    https: [port: 443,
#            keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#            certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables point to a file on
# disk for the key and cert.

# Do not print debug messages in production
config :logger, level: :info

# ## Using releases
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :chatty, Chatty.Endpoint, server: true
#

# Finally import the config/prod.secret.exs
# which should be versioned separately.
import_config "prod.secret.exs"

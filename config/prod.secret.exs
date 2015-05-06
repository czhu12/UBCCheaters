use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :chatty, Chatty.Endpoint,
  secret_key_base: "vGGZQJX01s70CyMN9MzfTfbcmm1Aa+NateYod6dIGrj6uh5MoteaoH03Vt+jGWS8"

# Configure your database
config :chatty, Chatty.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "chatty_prod"

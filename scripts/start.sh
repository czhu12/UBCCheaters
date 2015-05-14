build() {
  docker build -t chriszhu/ubc_cheaters_app .
}

data() {
  docker run -v /var/lib/postgresql/data --name ubc_cheaters_data busybox
}

db() {
  docker run --name ubc_cheaters_db -e POSTGRES_PASSWORD=2ubc4cheaters8 -d postgres
}

app() {
  docker run -p 80:8080 -i --link ubc_cheaters_db:postgres --name ubc_cheaters_app -d chriszhu/ubc_cheaters_app
}

action=$1

${action}

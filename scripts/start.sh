db() {
  docker run -P --name app_db -e POSTGRES_USER=chatty_prod -e POSTGRES_PASSWORD=chatty_prod -t postgres:latest
}

app() {
  
}

action=$1

${action}

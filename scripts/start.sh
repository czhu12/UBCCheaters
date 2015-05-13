db() {
  docker run -t postgres:latest
}

app() {
}

action=$1

${action}

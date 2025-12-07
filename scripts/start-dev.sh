#!/usr/bin/env bash
set -euo pipefail

# Simple script to start backend and frontend for local development.
# - Starts backend (Maven Spring Boot) at port 8080
# - Starts frontend (Vite) at port 5173
# Logs are written to `logs/backend.log` and `logs/frontend.log`.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT_DIR/logs"
mkdir -p "$LOG_DIR"

kill_on_port() {
  local port="$1"
  if command -v lsof >/dev/null 2>&1; then
    local pids
    pids=$(lsof -ti tcp:"$port" || true)
    if [ -n "$pids" ]; then
      echo "Killing processes on port $port: $pids"
      kill $pids || true
      sleep 1
    fi
  fi
}

start_backend() {
  echo "Starting backend (Spring Boot)"
  pushd "$ROOT_DIR/backend" >/dev/null
  nohup mvn -DskipTests spring-boot:run > "$LOG_DIR/backend.log" 2>&1 &
  popd >/dev/null
}

start_frontend() {
  echo "Starting frontend (Vite)"
  pushd "$ROOT_DIR/frontend" >/dev/null
  nohup npm run dev -- --host 127.0.0.1 > "$LOG_DIR/frontend.log" 2>&1 &
  popd >/dev/null
}

wait_for() {
  local url="$1"
  local tries=0
  local max=60
  until curl -sS "$url" >/dev/null 2>&1; do
    tries=$((tries+1))
    if [ "$tries" -ge "$max" ]; then
      echo "Timed out waiting for $url" >&2
      return 1
    fi
    sleep 1
  done
}

echo "Preparing to start dev services..."
kill_on_port 8080 || true
kill_on_port 5173 || true

start_backend
start_frontend

echo "Waiting for backend to respond at http://127.0.0.1:8080/api/items"
wait_for "http://127.0.0.1:8080/api/items"
echo "Backend is up"

echo "Waiting for frontend to respond at http://127.0.0.1:5173/"
wait_for "http://127.0.0.1:5173/"
echo "Frontend is up"

echo "Logs: $LOG_DIR"
echo "Tail logs with: tail -f $LOG_DIR/backend.log $LOG_DIR/frontend.log"

echo "Done"

SHELL := /bin/bash

.PHONY: dev stop logs e2e

dev:
	@./scripts/start-dev.sh

stop:
	@echo "Stopping services on ports 8080 and 5173"
	@if command -v lsof >/dev/null 2>&1; then \
	  pids=$$(lsof -ti tcp:8080 || true); [ -n "$$pids" ] && kill $$pids || true; \
	  pids=$$(lsof -ti tcp:5173 || true); [ -n "$$pids" ] && kill $$pids || true; \
	fi

logs:
	@tail -f logs/backend.log logs/frontend.log || true

e2e:
	@cd frontend && npm run test:e2e

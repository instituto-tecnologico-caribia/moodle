.PHONY: up down

OS := $(shell uname 2>/dev/null || echo Windows)

up:
	@docker compose up
	@echo "Waiting for http://localhost:8080..."
	@until curl -s http://localhost:8080 >/dev/null; do sleep 1; done
ifeq ($(OS),Darwin)
	@open http://localhost:8080
else ifeq ($(OS),Linux)
	@xdg-open http://localhost:8080
else
	@start http://localhost:8080
endif


down:
	@docker compose down --rmi local --volumes --remove-orphans

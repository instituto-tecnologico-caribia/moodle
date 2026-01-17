.PHONY: up down

up:
	@docker compose up

down: 
	@docker compose down --rmi local --volumes --remove-orphans


.PHONY: up down

up:
	@cd ./dockerfiles && docker compose up

down: 
	@cd ./dockerfiles && docker compose down --rmi local --volumes --remove-orphans


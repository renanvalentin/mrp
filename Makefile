.PHONY: demo test help
.DEFAULT_GOAL: help

default: help

help: ## Output available commands
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

demo:  ## Run a demo on port 3000
	@docker-compose build demo
	@docker-compose up demo

test: ## Run all modules test suite
	@docker-compose build test
	@docker-compose run --rm test
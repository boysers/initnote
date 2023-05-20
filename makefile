ifeq (up,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif

ifeq (down,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif

ifeq (clear,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif

ifeq (logs,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif

.PHONY: up
up:
	docker compose -f docker-compose.yml -f docker-compose.${RUN_ARGS}.yml up -d --build

.PHONY: down
down:
	docker compose -f docker-compose.yml -f docker-compose.${RUN_ARGS}.yml down

.PHONY: clear
clear:
	docker compose -f docker-compose.yml -f docker-compose.${RUN_ARGS}.yml down --rmi "local"

.PHONY: log
logs:
	docker logs -f ${RUN_ARGS}

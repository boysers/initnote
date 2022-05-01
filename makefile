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

.PHONY: up
up:
	docker-compose -f docker-compose.yml -f docker-compose.${RUN_ARGS}.yml up -d

.PHONY: down
down:
	docker-compose -f docker-compose.yml -f docker-compose.${RUN_ARGS}.yml down

.PHONY: clear
clear:
	docker-compose -f docker-compose.yml -f docker-compose.${RUN_ARGS}.yml down --rmi "local"

logs:
	docker logs -f api-express

# prod:
# 	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# stop:
# 	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

# dev: 
# 	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# down:
# 	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# logs:
# 	docker logs -f api-express

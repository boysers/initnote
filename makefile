# args="$(filter-out $@,$(MAKECMDGOALS))"

dev: 
	docker-compose up -d

stop:
	docker-compose down

# logs:
# 	docker logs -f $(call args)

logs:
	docker logs -f api-express

# %:
# 	@:
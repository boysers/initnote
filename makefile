prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

stop:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

dev: 
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

logs:
	docker logs -f api-express

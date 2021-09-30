link-build:
	docker build -t 389798/link-image .
link-up:
	docker run --rm -p 3000:3000 --name link-container 389798/link-image 
link-down:
	docker stop link-container 
mongo-up:
	docker run --rm -p 27017:27017 --name mongo-link-container -e MONGO_INITDB_ROOT_USERNAME=${MONGO_USER} -e MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD} mongo 
mongo-down: 
	docker stop mongo-link-container 
mongo-inside-container:
	docker exec -it mongo-link-container /bin/bash
create-network:
  docker network create link-network
double-up:
	docker-compose up -d 
double-down: 
	docker-compose down
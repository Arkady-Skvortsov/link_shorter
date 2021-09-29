link-build:
  docker build -t 389798/link-image .
link-up:
  docker run --rm -p 3000:3000 --name link-container 389798/link-image 
link-down:
  docker stop link-container 
mongo-up:
  docker run --rm -p 27017:27017 --name mongo-link-container mongo 
mongo-down: 
  docker stop mongo-link-container 
mongo-inside-container:
  docker exec -it mongo-link-container /bin/bash
double-up:
  docker-compose up -d 
double-down: 
  docker-compose down
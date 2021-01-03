init:
	cd app && yarn
	cd server && yarn

start_server:
	cd server && yarn start

start_app:
	cd app && yarn start

build:
	docker build -t mateeyow/dev-challenge-server .

run_server:
	docker run -p 8080:8080 --name server -d mateeyow/dev-challenge-server

# Dev Challenge


Mono-repo for both front-end and back-end application. 

## DEMO

You can visit the demo application on this url [https://mateeyow-refinitiv.netlify.app/](https://mateeyow-refinitiv.netlify.app/)

## Folder structure

- [app](/app) - Contains all front-end codes.

  Tech used:
  - CRA (create-react-app) - bootstrap the application
  - [Chakra UI](https://chakra-ui.com/) - UI framework
  - [React Force Graph](https://github.com/vasturiano/react-force-graph) - Charting library

- [server](/server) - Contains all back-end logic

  Tech used:
  - [ExpressJS](http://expressjs.com/) - API framework

## Dev Setup

### Prerequisites

- [Neo4j](https://neo4j.com/download-center/#desktop) >= v4.1
- [NodeJs](https://nodejs.org/en/) >= v12.20

Steps to run the application on your local environment:

1. Download dataset from this [url](https://offshoreleaks-data.icij.org/offshoreleaks/csv/csv_paradise_papers.2018-02-14.zip)
2. Import the CSV to neo4j database. You can check the commands I used to dump the data from [this cypher file](/init.cypher)
3. Clone this repository on your local dev machine
4. Run `make init` to install all dependencies
5. Run `make start_server` to start the backend server
6. Run `start_app` to start the frontend application

Missing:
1. Streaming
2. Pagination
3. Getting all edges of a node
4. Different Views

https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-neo4j-on-ubuntu-20-04

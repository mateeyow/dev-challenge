# Dev Challenge


Mono-repo for both front-end and back-end application. 

> Not all datasets were loaded as it took way too long to import them all
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

## Production Setup

Since I don't have AWS account, I deployed the application on [digitalocean](digitalocean.com/) and [netlify](https://www.netlify.com/)

### Deploying the front-end application

Since FE application is just static files. I chose to deploy it to netlify as they have free-tier to deploy any static files. You can check the documentation on how to deploy an application [here](https://docs.netlify.com/site-deploys/create-deploys/)

### Deploying the back-end application

Refinitiv Server URL: https://refinitiv-server.mateeyow.com/

### SPECS:

- CPU: 4 vCPU
- Memory: 8GB
- SSD: 50GB

As I'm more familiar in Digitalocean, I chose to deploy the application on this platform. 

Steps on how to deploy the API:
1. Build docker image by running `make build`
1. Push the docker image to dockerhub
1. Provision a droplet on Digitalocean
1. Install [neo4j server](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-neo4j-on-ubuntu-20-04)
1. Dump data to the database
1. Run `docker run -p 8080:8080 --name server -d --restart always mateeyow/dev-challenge-server`
1. Install nginx and configure as reverse proxy

## Backlog

Here are the missing features that needs to be implemented on the application

1. Streaming the data - Since this should contain a huge array of data. We should consider how we are going to load the data to the client. One approach I can see is to stream this huge over to the client
1. Getting all edges of a node - Data visualization is very limited at the moment. The current functionality of the application can only accommodate one edge (vertice). As such we are not able to accurately view the network and the relationship of each nodes.
1. Details for network graph - User should be able to view the details of each of the node. Upon hover, user should be able to tell the Entity of the node and other details if needed.
1. Different Views - We need to support different views other than the network visualization, e.g. Table, Detailed View
1. Proper logging and monitoring

## Approach

As I don't have enough time to create slides, I will enumrate the approach I did to tackle this dev challenge.

1. As I have no background with graph databases, I began researching and reading any basic information I can find about Graph database
1. I investigated the url and where the data is coming from which leads me to its neo4j desktop application with dataset loaded. I began playing around with the database.
1. As neo4j is one of the leading graph database, I read and researched the basics on how to use neo4j
1. Investigated the edges.csv file to check what are the edges that should be saved to the database.
1. Loaded the CSV file using the cypher query language
1. I checked the list of suggestions to visualize the data on the front-end and decided to choose React Force Graph as it is one of the library that supports Network graph and has less learning curve compared to other libraries
1. Created the API and tailored the response according to the need of the front-end application to reduce load on the client-side.

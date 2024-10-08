# jackson-restore

Restore Data From MongoDB Backups To External API

# Explanation

Let's say you have a service that calls an API with `jackson-load-balancer` which fails so it logs the request body.

How do you make request again with that data once the API is back up?

Well, you can just use `jackson-restore` to query the `data` values from your `logs` MongoDB collection where `status` is "ERROR" and make another request to your API.

Upon success, the log with your restored data will be deleted. If there is another failure, the log will remain to be processed by the next iteration of this program.

Run this on a scheduled task `ENV=PRODUCTION` to make sure your failed requests are always restored as soon as possible.

_Currently, the program does not make new requests through `jackson-load-balancer` because it would log a new error for each new failure resulting in exponential log growth if the destination API continues to fail. I am working on this._

# Environment (.env)

```
# SYSTEM
ENV=PRODUCTION
# ANYTHING ELSE IS CONSIDERED A SCRIPT
SCRIPT_INTERVAL=300000

# ORIGIN
MONGODB_URIs=mongodb://localhost:XXXX/YOUR_DATABASE_1,mongodb://localhost:XXXX/YOUR_DATABASE_2
COLLECTION=YOUR_LOGS_COLLECTION
STATUS=YOUR_STATUS_PROPERTY
DATA=YOUR_DATA_PROPERTY
ROUTE=YOUR_URL_ROUTE
LIMIT=10
INTERVAL=1000

# DESTINATION
APIs=https://YOUR_DOMAIN_1,https://YOUR_DOMAIN_2
AUTHORIZATION=YOUR_TOKEN
CONTENT_TYPE="application/json"
```

# Connect, Query, & Restore

```
$ git clone https://github.com/jacksonmccluskey/jackson-restore
$ cd jackson-restore
$ npm install
$ npm run restore
```

# Run With Docker Compose...

```
services:
  jackson-restore:
    image: node:20
    build: .
    container_name: jackson-restore
    working_dir: /app

    environment:
      - ENV=TESTING
      - SCRIPT_INTERVAL=300000
      - MONGOD_URIs_=mongodb://...1,mongodb://...2
      - COLLECTION=...
      - STATUS=...
      - DATA=...
      - ROUTE=...
      - LIMIT=10
      - INTERVAL=1000
      - APIs=https://...1,https://...2
      - AUTHORIZATION=Bearer ...
      - CONTENT_TYPE=application/json

    ports:
      - '10101:10101'

    command: ['npm', 'run', 'restore']

    restart: always

    volumes:
      - .:/app

    networks:
      - jackson-load-balancer_jackson-network

networks:
  jackson-load-balancer_jackson-network:
    external: true
```

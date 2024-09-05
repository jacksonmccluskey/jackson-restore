# jackson-restore

Restore Data From MongoDB Backups To External API

# Explanation

Let's say you have a service that calls an API which fails so you log the request using `jackson-load-balancer`.

How do you make request again with that data once your API is back up?

Well, you can just use `jackson-restore` to query documents from your `logs` MongoDB collection where `status` is "ERROR" and make another request to your API with the value in the `data` propert as the request body.

# Environment (.env)

```
# SYSTEM
NODE_ENV=TESTING

# ORIGIN
ORIGIN_MONGODB_URI=mongodb://localhost:27017/
ORIGIN_COLLECTION_NAME=logs
ORIGIN_DATA_PROPERTY_NAME=data
LOG_QUERY_LIMIT=10

# DESTINATION
RETRY_URL=https://yourapi.com
```

# Connect, Query, & Restore

```
$ git clone https://github.com/jacksonmccluskey/jackson-restore
$ cd jackson-restore
$ npm install
$ npm run restore
```

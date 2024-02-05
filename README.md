# Node.JS Webflow APIs integration

### LIVE URL
[https://energetic-dog-bandanna.cyclic.app/](https://energetic-dog-bandanna.cyclic.app/)
## Scheduled Job (CRON JOB):
The Scheduled job (cron job) is scheduled to be run every sunday automatically.

## Endpoints

### REST APIs provide the following endpoints:

#### Base API Endpoint
```
/api/v1
```

#### Return all the job posts:

Structure:

```
GET /job-posts
```

#### Return a specific job post by ID:

Structure:

```
GET /job-posts/:id
```

#### Create a new job post:

Structure:

```
POST /job-posts
```

#### Update job post by ID:

Structure:

```
PATCH /job-posts/:id
```

#### Delete job post by ID:

Structure:

```
DELETE /job-posts/:id
```

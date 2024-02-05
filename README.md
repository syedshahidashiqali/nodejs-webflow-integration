# Node.JS Webflow APIs integration

## Webflow Website

[https://shahids-job-posts-site.webflow.io/](https://shahids-job-posts-site.webflow.io/)

## Try My Docker Image
### Docker Hub URL

[https://hub.docker.com/r/syedshahidashiqali/nodejs-webflow-integration](https://hub.docker.com/r/syedshahidashiqali/nodejs-webflow-integration)

#### Steps:
```
1. docker pull syedshahidashiqali/nodejs-webflow-integration
2. docker run -p 5000:5000 --name any-container-name syedshahidashiqali/nodejs-webflow-integration:latest
```

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

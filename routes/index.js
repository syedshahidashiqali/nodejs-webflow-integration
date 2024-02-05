const express = require("express");
const router = express.Router();
const jobPost = require("./jobPost");

router.use("/job-posts", jobPost);

module.exports = router;

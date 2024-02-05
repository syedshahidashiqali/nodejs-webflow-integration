const express = require("express");
const router = express.Router();
const {
  createJobPost,
  getAllJobPosts,
  getJobPost,
  updateJobPost,
  deleteJobPost,
  getLastTenJobs,
} = require("../controllers/jobPost");

router.post("/", createJobPost);
router.get("/", getAllJobPosts);
router.get("/:id", getJobPost);
router.patch("/:id", updateJobPost);
router.delete("/:id", deleteJobPost);

module.exports = router;

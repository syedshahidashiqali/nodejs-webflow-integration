const JobPost = require("../models/JobPost");
const {
  apiError,
  apiSuccess,
  apiSuccessWithData,
} = require("../utils/apiHelpers");

// << MongoDB CRUD >>

// POST | Create a New Job Post
exports.createJobPost = async (req, res) => {
  try {
    const newJobPost = new JobPost(req.body);
    const savedJobPost = await newJobPost.save();
    res
      .status(201)
      .json(apiSuccessWithData("Your Job posted successfully", savedJobPost));
  } catch (err) {
    res.status(500).json(apiError(err));
  }
};

// GET | Get all Job Posts
exports.getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({});
    res.status(200).json(apiSuccessWithData("All Job Posts", jobPosts));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};

// GET | Get a Job Post by ID
exports.getJobPost = async (req, res) => {
  try {
    const { id } = req.params;
    const jobPost = await JobPost.findById(id);
    res.status(200).json(apiSuccessWithData("Job Post", jobPost));
  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};

// PATCH | Update a Job Post
exports.updateJobPost = async (req, res) => {
  try {
    const { id } = req.params;

    const jobPostToUpdate = await JobPost.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json(
        apiSuccessWithData("Job Post updated successfully!", jobPostToUpdate)
      );
  } catch (err) {
    res.status(500).json(apiError(err));
  }
};

// DELETE | Delete a Job Post
exports.deleteJobPost = async (req, res) => {
  try {
    const { id } = req.params;

    await JobPost.findByIdAndDelete(id, req.body);

    res.status(200).json(apiSuccess("Job Post deleted successfully!"));
  } catch (err) {
    res.status(500).json(apiError(err));
  }
};

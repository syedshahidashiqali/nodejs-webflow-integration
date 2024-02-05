const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPostSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    macroClusters: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    ral: {
      type: String,
      required: true,
    },
    buttonUrl: {
      type: String,
    },
    webflowId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", jobPostSchema);

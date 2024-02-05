const cron = require("node-cron");
const { synchronizeJobPosts } = require("../services/helpers");

// Run every Sunday at midnight
cron.schedule("0 0 * * 0", synchronizeJobPosts);

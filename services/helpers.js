const JobPost = require("../models/JobPost");
const { logger } = require("../config/winston");
const {
  createNewWebFlowItem,
  updateWebFlowItem,
  getAllWebflowItems,
  deleteWebflowItem,
  publishWebFlowItems,
} = require("./webflow");
const {
  buildMongoItemDataForUpdate,
  buildWebflowItemDataForUpdate,
} = require("../utils/utilities");

// Get last 10 jobs posted within this week
const getRecentJobsPostedOnMongoDB = async () => {
  try {
    const now = new Date();
    const startOfWeek = new Date(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      ).setUTCHours(0, 0, 0, 0)
    );

    const pipeline = [
      {
        $match: {
          createdAt: { $gte: startOfWeek },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
    ];

    const jobPosts = await JobPost.aggregate(pipeline);
    return jobPosts;
  } catch (err) {
    console.log("getRecentJobsPostedOnMongoDB => error thrown", err);
    return [];
  }
};

// Main function to sync job posts between MongoDB and Webflow CMS
const synchronizeJobPosts = async () => {
  try {
    // Fetch job posts from MongoDB
    const jobPosts = await getRecentJobsPostedOnMongoDB();

    // Check if there are job posts fetched from MongoDB
    if (jobPosts.length > 0) {
      logger.info(`${jobPosts.length} Job Posts fetched from MongoDB.`);
      // Sync job posts to Webflow CMS
      await syncJobPostsToWebflow(jobPosts);

      // Delete unwanted items from Webflow CMS
      const mongoIds = jobPosts.map((jobPost) => jobPost._id);
      await deleteUnwantedItemsFromWebflow(mongoIds);
    } else {
      logger.info(
        "No job posts fetched from MongoDB. Skipping synchronization."
      );
    }
  } catch (error) {
    logger.error(`Error synchronizing job posts: ${error.message}`);
  }
};

// Sync job posts to Webflow CMS
const syncJobPostsToWebflow = async (jobPosts) => {
  try {
    const webflowItemIdsForPublish = [];
    // Iterate through the job posts and update/create items in the Webflow CMS
    for (const jobPost of jobPosts) {
      try {
        // Use Webflow SDK to update/create item

        const webflowItemData = buildWebflowItemDataForUpdate(jobPost);

        if (jobPost.webflowId == "") {
          const createdItemId = await createNewWebFlowItem(webflowItemData);

          if (createdItemId !== null) {
            const mongoItemData = buildMongoItemDataForUpdate(
              jobPost,
              createdItemId
            );

            await JobPost.findByIdAndUpdate(jobPost._id, mongoItemData);
            logger.info(
              `Job Post with Mongo ID ${jobPost._id} synced to Webflow CMS. CMS ID ${createdItemId}`
            );

            webflowItemIdsForPublish.push(createdItemId);
          }
        } else {
          logger.info(
            `Job Post with Mongo ID ${jobPost._id} is already synced to Webflow CMS. UPDAING ITEM`
          );

          const updatedItemId = await updateWebFlowItem(
            jobPost.webflowId,
            webflowItemData
          );

          if (updatedItemId !== null) {
            logger.info(`Job Post with Mongo ID ${jobPost._id} is updated!`);
          }

          webflowItemIdsForPublish.push(jobPost.webflowId);
        }
      } catch (error) {
        logger.error(`Error syncing job post ${jobPost._id}: ${error.message}`);
      }
    }

    console.log("webflowItemIdsForPublish", webflowItemIdsForPublish);
    logger.info(
      `${webflowItemIdsForPublish} Job Post Going to be published on Webflow CMS`
    );

    const publishedItems = await publishWebFlowItems(webflowItemIdsForPublish);
    logger.info(
      `${publishedItems} Job Post(s) has/have been published on Webflow CMS`
    );
  } catch (error) {
    logger.error(`Error syncing job posts to Webflow CMS: ${error.message}`);
  }
};

// Delete unwanted items from Webflow CMS
const deleteUnwantedItemsFromWebflow = async (mongoIds) => {
  try {
    // Get all items from Webflow CMS
    const webflowItems = await getAllWebflowItems();

    // Extract IDs of items in Webflow CMS
    const webflowIds = webflowItems
      .filter((item) => mongoIds.includes(item.fieldData.slug))
      .map((item1) => item1?.fieldData.slug);

    logger.info(
      `${webflowIds.length} items are ready for deletion from Webflow CMS`
    );

    // Delete each unwanted item
    for (const id of webflowIds) {
      const isItemDeleted = await deleteWebflowItem(id);
      if (isItemDeleted === true) {
        logger.info(`Item ${id} deleted from Webflow CMS`);
      }
    }
  } catch (error) {
    logger.error(`Error deleting items from Webflow CMS: ${error.message}`);
  }
};

module.exports = {
  getRecentJobsPostedOnMongoDB,
  synchronizeJobPosts,
  syncJobPostsToWebflow,
  deleteUnwantedItemsFromWebflow,
};

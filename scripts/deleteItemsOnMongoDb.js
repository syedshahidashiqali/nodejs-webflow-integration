const JobPost = require("../models/JobPost");

const deleteItemsOnMongoDb = async () => {
  try {
    const deletedIems = await JobPost.deleteMany({});
    console.log(`${deletedIems.deletedCount} items deleted!`);
  } catch (err) {
    console.log(
      "deleteItemsOnMongoDb => error while deleting jobs on mongo",
      err
    );
  }
};

// deleteItemsOnMongoDb().then((a) => a);

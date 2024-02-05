const { webflow } = require("../config/webflow");

const webflowCollectionId = process.env.WEBFLOW_COLLECTION_ID;

const deleteItemsOnWebflow = async () => {
  try {
    const webflowItems = await webflow.get(
      `collections/${webflowCollectionId}/items`
    );

    const webflowItemIds =
      webflowItems?.data?.items?.length >= 1 &&
      webflowItems?.data?.items?.map((item) => item?.id);
    if (webflowItemIds.length > 0) {
      console.log(`${webflowItemIds.length} Jobs Found for deletion!`);

      for (let itemId of webflowItemIds) {
        const deletedItem = await webflow.delete(
          `collections/${webflowCollectionId}/items/${itemId}`
        );

        if (deletedItem.status === 204) {
          console.log("Job Deleted");
        }
      }
    }
    console.log("No Jobs Found for deletition!");
  } catch (err) {
    console.log(err);
  }
};

// deleteItemsOnWebflow().then((a) => a);

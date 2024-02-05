const { webflow } = require("../config/webflow");
const { sanitizeWebflowAPIResponse } = require("../utils/utilities");

// ENV VARIABLE
const webflowCollectionId = process.env.WEBFLOW_COLLECTION_ID;

// GET ALL ITEMS
const getAllWebflowItems = async () => {
  try {
    const webflowItems = await webflow.get(
      `collections/${webflowCollectionId}/items`
    );

    const itemsData = sanitizeWebflowAPIResponse("GET_ALL", webflowItems);

    return itemsData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// GET SINGLE ITEM
const getWebFlowItemById = async (id) => {
  try {
    const webflowItem = await webflow.get(
      `collections/${collection_id}/items/${id}`
    );

    const itemData = sanitizeWebflowAPIResponse("GET_SINGLE", webflowItem);

    return itemData;
  } catch (err) {
    return null;
  }
};

// CREATE NEW ITEM
const createNewWebFlowItem = async (data) => {
  try {
    const createdItem = await webflow.post(
      `collections/${webflowCollectionId}/items`,
      data
    );

    const itemData = sanitizeWebflowAPIResponse("CREATE", createdItem);

    return itemData;
  } catch (err) {
    return null;
  }
};

// UPDATE ITEM
const updateWebFlowItem = async (id, data) => {
  try {
    const updatedWebflowItem = await webflow.put(
      `collections/${webflowCollectionId}/items/${id}`,
      data
    );

    const itemData = sanitizeWebflowAPIResponse("UPDATE", updatedWebflowItem);

    return itemData;
  } catch (err) {
    return null;
  }
};

// DELETE ITEM
const deleteWebflowItem = async (id) => {
  try {
    const deletedWebflowItem = await webflow.delete(
      `collections/${webflowCollectionId}/items/${id}`
    );

    const itemData = sanitizeWebflowAPIResponse("DELETE", deletedWebflowItem);

    return itemData;
  } catch (err) {
    return false;
  }
};

// PUBLISH ITEMS
const publishWebFlowItems = async (itemIds) => {
  try {
    const publishedItems = await webflow.post(
      `collections/${webflowCollectionId}/items/publish`,
      { itemIds: itemIds }
    );

    const itemData = sanitizeWebflowAPIResponse("PUBLISH", publishedItems);

    return itemData;
  } catch (err) {
    return 0;
  }
};

module.exports = {
  getAllWebflowItems,
  getWebFlowItemById,
  createNewWebFlowItem,
  updateWebFlowItem,
  deleteWebflowItem,
  publishWebFlowItems,
};

// Format the log time in a human-readable format
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Check if object is not empty
const isObjectNotEmpty = (obj) => {
  return Object.keys(obj).length > 0;
};

// Returns sanitized weflow responses
const sanitizeWebflowAPIResponse = (method, data) => {
  // PUBLISH ITEMS
  if ((data.status === 200 || data.status === 202) && method == "PUBLISH") {
    if (data?.data.publishedItemIds) {
      return data?.data.publishedItemIds.length;
    }
    return 0;
  }

  // GET ALL ITEMS
  if (data.status == 200 && method === "GET_ALL") {
    if (data?.data?.items?.length > 0) {
      return data?.data?.items;
    }
    return [];
  }

  // GET SINGLE ITEM
  if (data.status == 200 && method === "GET_SINGLE") {
    if (isObjectNotEmpty(data?.data)) {
      return data?.data;
    }
    return null;
  }

  // CREATE ITEM
  if (data.status === 202 && method === "CREATE") {
    if (isObjectNotEmpty(data?.data)) {
      return data?.data?.id;
    }
    return null;
  }

  // UPDATE ITEM
  if (data.status === 200 && method === "UPDATE") {
    if (isObjectNotEmpty(data?.data)) {
      return data?.data?.id;
    }
    return null;
  }

  // DELETE ITEM
  if (data.status === 204 && method === "DELETE") {
    return true;
  }

  return false;
};

const buildWebflowItemDataForUpdate = (jobPost) => {
  let webflowItemData = {
    fieldData: {
      buttonurl: jobPost?.buttonUrl,
      name: jobPost?.title,
      city: jobPost?.city,
      companyname: jobPost?.companyName,
      macroclusters: jobPost?.macroClusters,
      type: jobPost?.type,
      mode: jobPost?.mode,
      ral: jobPost?.ral,
      companylogo: {
        url: jobPost?.companyLogo,
      },
      slug: jobPost?._id,
    },
  };

  return webflowItemData;
};

const buildMongoItemDataForUpdate = (jobPostData, webflowItemId) => {
  let mongoItemData = {
    buttonUrl: jobPostData?.buttonUrl,
    title: jobPostData?.title,
    city: jobPostData?.city,
    companyName: jobPostData?.companyName,
    macroClusters: jobPostData?.macroClusters,
    type: jobPostData?.type,
    mode: jobPostData?.mode,
    ral: jobPostData?.ral,
    companyLogo: jobPostData?.companyLogo,
    webflowId: webflowItemId,
  };

  return mongoItemData;
};

module.exports = {
  formatDate,
  isObjectNotEmpty,
  sanitizeWebflowAPIResponse,
  buildWebflowItemDataForUpdate,
  buildMongoItemDataForUpdate,
};

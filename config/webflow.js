const Webflow = require("webflow-api");

const options = {
  beta: true,
  token: process.env.WEBFLOW_API_KEY,
};

exports.webflow = new Webflow({ ...options });

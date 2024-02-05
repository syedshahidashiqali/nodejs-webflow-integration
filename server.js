const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./cronJobs/schduledSynchronisation");

// DB Connection
const { connectDB } = require("./config/db");

const routes = require("./routes/index");

// Express JS Server APP
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", routes);

// Testing Routes
app.get("/", (req, res) =>
  res.status(200).json({
    message: "Welcome to the Webflow API integration project by StepsConnect",
    developer: "Shahid Ali",
  })
);

app.get("/welcome", (req, res) => {
  console.log(`${__dirname}/static/welcome.html`);
  return res.sendFile(`${__dirname}/static/welcome.html`);
});

const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

require("dotenv").config();

// create a port variable
const PORT = process.env.PORT || 5000;

// import express
const express = require("express");
// create an instance of express called app
const app = express();

const cors = require("cors");

const router = require("./routes");

const connectToMongoDB = require("./dbConnection");

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS //frontend URL
      ? process.env.ALLOWED_ORIGINS.split(",").map((url) => url.trim())
      : [],
  }),
);

app.use("/api", router);

const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");

// MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err.message);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Listings route
app.get("/listings", async (req, res) => {

    // Fetch all listings from the database
    const allListings = await Listing.find({});
    // Render the 'listings/index' view and pass the data
    res.render("listings/index.ejs", { allListings });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

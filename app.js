const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
app.get("/", (req, res) => {
  res.send("hi, I am root");
});
app.get("/testlisting", async (req, res) => {
  try {
    let sampleListing = new Listing({
      title: "My New Villa",
      description: "by the beach",
    });

    await sampleListing.save();
    res.send("Sample listing created successfully");
  } catch (err) {
    res.status(500).send("Error creating sample listing: " + err.message);
  }
});

app.listen(8080, () => {
  console.log("Server is Listening to Port no 8080");
});

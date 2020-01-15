const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = express();

app.use(express.json());

mongoose
  .connect(config.get("MongoDBURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB Atlas Cluster."))
  .catch(error => console.log(error));

app.get("/", (req, res) => res.status(200).json({ success: "Welcome!" }));

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

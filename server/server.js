const express = require("express");
const database = require("./database");
const app = express();
const port = process.env.PORT || 5000;

database();

app.use(express.json());
app.use("/api", require("./routes"));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

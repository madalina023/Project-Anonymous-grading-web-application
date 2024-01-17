const express = require("express");
const cors = require("cors");
const connection = require("./models").connection;
const router = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true })); // bodyparser integrat in node.js
app.use(express.json());

app.use(cors());

let port = 8080;

app.use("/api", router);

app.get("/reset", (req, res) => {
  connection
    .sync({
      force: true,
    })
    .then(() => {
      console.log("Database reset");
      res.status(201).send({ message: "Database reset" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Database reset failed" });
    });
});

app.use("/*", (req, res) => {
  res.status(200).send("App running");
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});

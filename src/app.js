const express = require("express");
const app = express();
app.use("/test", (req, res) => {
  res.send("Hello From the testing department");
});
app.use("/main", (req, res) => {
  res.send("Hello From the Server");
});
app.use("/", (req, res) => {
  res.send("Hello From the dashboard");
});
app.listen(3333, () => {
  console.log("Server is successfully listening on port 7000");
});

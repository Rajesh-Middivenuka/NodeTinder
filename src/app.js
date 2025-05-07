const express = require("express");
const app = express();
app.use("/test", (req, res) => {
  res.send("hello from the server");
});
app.use("/home", (req, res) => {
  res.send("it is home");
});
app.use("/about", (req, res) => {
  res.send("it is about pages");
});
app.listen(3000, () => {
  console.log("server is successfully listening on the port");
});

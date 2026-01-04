const express = require("express");
const app = express();
// app.use("/", (req, res) => {
//   res.send("Hello From the dashboard");
// });
// app.use("/test", (req, res) => {
//   res.send("Hello From the testing department");
// });
app.use("/user", (req, res) => {
  res.send("Hello From the Server");
});

app.get("/get",(req,res)=>{
  res.send("get request call successfully")
})
app.post("/post",(req,res)=>{
  res.send("post request call successfully")
})
app.delete("/delete",(req,res)=>{
  res.send("delete request call successfully")
})


app.use("/main", (req, res) => {
  res.send("Hello From the Server");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777");
});

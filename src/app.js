const express = require("express");
const app = express();
// app.use("/", (req, res) => {
//   res.send("Hello From the dashboard");
// });
// app.use("/test", (req, res) => {
//   res.send("Hello From the testing department");
// });
 app.get("/user/:userId/:name/:password",(req,res)=>{
  console.log(req.params)
  res.send({fistname: "Rahul",lastName:"Singh"})
 })
app.listen(7777, () => {
  console.log("Server is successfully listening on port 77777");
});

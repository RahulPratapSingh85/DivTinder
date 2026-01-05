const express = require("express");
const app = express();
// app.use("/", (req, res) => {
//   res.send("Hello From the dashboard");
// });
// app.use("/test", (req, res) => {
//   res.send("Hello From the testing department");
// });
//  app.get("/user/:userId/:name/:password",(req,res)=>{
//   console.log(req.params)
//   res.send({fistname: "Rahul",lastName:"Singh"})
//  })
// 
const{adminAuth,userAuth}=require("./middleware/auth")
app.use("/admin",adminAuth)
app.get("/user",userAuth,(req,res)=>{
  res.send("User data is called!")
})
app.get("/admin/userInfo",(req,res)=>{
  res.send(" admin userID calledd the data")
})
app.get("/admin/deleteData",(req,res)=>{
  res.send(" admin delete calledd the data")
})
app.listen(7777, () => {
  console.log("Server is successfully listening on port 77777");
});

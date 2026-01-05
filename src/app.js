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
app.get("/user", (req, res,next) => {
  console.log("kya ji user 11 ");
  // res.send("hello from the user 1");
  next();
  
},
(req,res,next)=>{
  console.log("kya ji user 2 ");
  //res.send("hello from the res 2")
  next()

},
(req,res,next)=>{
  //res.send("hello from the res 2")
  console.log("kya ji user 3 ");
  next()

},
(req,res,next)=>{
  console.log("kya ji user 4 ");
  res.send("hello from the res 4")

}
);
app.listen(7777, () => {
  console.log("Server is successfully listening on port 77777");
});

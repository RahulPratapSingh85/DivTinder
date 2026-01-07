const express = require("express");

const connectDB = require("./config/database");
const app = express(); //
const User = require("./model/user");

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
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("something is wrong");
//   }
// });
// app.get("/getUserData", (req, res) => {
//   throw new Error("dfbslsf");
//   res.send("User data send");
// });
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("something is wrong");
//   }
// });/
// hello

app.post("/sigup", async (req, res) => {
  const user = new User({
    firstName: "Ruhi",
    lastName: "Singh",
    emailId: "rahul@gmail.com",
    password: 1234,
  });
  await user.save();
  res.send("user added successfully");
});
connectDB()
  .then(() => {
    console.log("database connections established....");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 77777");
    });
  })
  .catch((err) => {
    console.error("database cannot be conncected.......");
  });

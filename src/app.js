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
app.use(express.json());
app.post("/sigup", async (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.send("user added successfully");
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});
// this is for updating the data inside
// patch apid
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("updated data successfully");
  } catch (err) {
    res.status(404).send("somethig went wrong");
  }
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

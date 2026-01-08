// const express = require("express");

// const connectDB = require("./config/database");
// const app = express(); //
// const User = require("./model/user");

// // app.use("/", (req, res) => {
// //   res.send("Hello From the dashboard");
// // });
// // app.use("/test", (req, res) => {
// //   res.send("Hello From the testing department");
// // });
// //  app.get("/user/:userId/:name/:password",(req,res)=>{
// //   console.log(req.params)
// //   res.send({fistname: "Rahul",lastName:"Singh"})
// //  })
// //
// // app.use("/", (err, req, res, next) => {
// //   if (err) {
// //     res.status(500).send("something is wrong");
// //   }
// // });
// // app.get("/getUserData", (req, res) => {
// //   throw new Error("dfbslsf");
// //   res.send("User data send");
// // });
// // app.use("/", (err, req, res, next) => {
// //   if (err) {
// //     res.status(500).send("something is wrong");
// //   }
// // });/
// // hello
// app.use(express.json());
// app.post("/sigup", async (req, res) => {
//   // console.log(req.body);
//   const user = new User(req.body);
//   await user.save();
//   res.send("user added successfully");
// });
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(404).send("something went wrong");
//   }
// });
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully");
//   } catch (err) {
//     res.status(404).send("something went wrong");
//   }
// });
// // this is for updating the data inside
// // patch apid
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   try {
//     await User.findByIdAndUpdate({ _id: userId }, data);
//     res.send("updated data successfully");
//   } catch (err) {
//     res.status(404).send("somethig went wrong");
//   }
// });
// connectDB()

//   .then(() => {
//     console.log("database connections established....");
//     app.listen(7777, () => {
//       console.log("Server is successfully listening on port 77777");
//     });
//   })
//   .catch((err) => {
//     console.error("database cannot be conncected.......");
//   });
const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./model/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = req.body;

  const user = new User(userObj);
  try {
    await user.save();
    res.status(200).send("User Added successfully");
  } catch (err) {
    res.status(500).send("error saving the user " + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const { email, username } = req.body;
    const userId = email || username;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Email or username must be provided" });
    }

    const user = await User.findOne({
      $or: [{ email: userId }, { username: userId }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong " + err.message });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ error: "User no user exist" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong " + err.message });
  }
});

app.delete("/user", async (req, res) => {
  try {
    const { email, username } = req.body;
    const userId = email || username;

    if (!userId) {
      return res
        .status(404)
        .json({ error: "Email or username must be provided" });
    }

    const user = await User.findOneAndDelete({
      $or: [{ username: userId }, { email: userId }],
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).json({
      deletedUser: `User with username : ${user.username} and email : ${user.email} has been deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong " + err.message });
  }
});

// Added Sanitizing and Validations at Api level

app.patch("/user", async (req, res) => {
  try {
    const { email, username } = req.body;
    const userId = email || username;

    const ALLOWED_UPDATE = [
      "username",
      "firstName",
      "lastName",
      "password",
      "avatar",
      "about",
      "skills",
      "dateOfBirth",
      "gender",
      "role",
      "status",
    ];
    const data = req.body;

    const isUpdateAllowed = Object.keys(data).every(
      (k) => ALLOWED_UPDATE.includes(k)
    );

    if(!isUpdateAllowed){
      throw new Error("Update not allow")
    }

    if (!userId) {
      return res
        .status(404)
        .json({ error: "Email or username must be provided" });
    }

    const user = await User.findOneAndUpdate(
      {
        $or: [{ username: userId }, { email: userId }],
      },
      data,
      { runValidators: true }
    );

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).json({
      updatedUser: `User with username : ${user.username} and email : ${user.email} has been Updated`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong " + err.message });
  }
});

connectDB()
  .then(() => {
    console.log("database connection establish");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777...");
    });
  })
  .catch((err) => console.error(err));

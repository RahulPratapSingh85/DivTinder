const express=require("express");
const authRouter=express.Router();
const{validateSignUpdata}=require("../utils/validation");
const{validateEditProfileData}=require("../utils/validation");
const User = require("../model/user");
const validator = require("validator");
const bcrypt=require("bcrypt");
const { userAuth } = require("../middleware/auth");

authRouter.post("/signup", async (req, res) => {
  try{
  validateSignUpdata(req);
  const {firstName,lastName,emailId,password}=req.body;
  const hashPassword= await bcrypt.hash(password,10);
  console.log(hashPassword);
  // const userObj = req.body;

  const user = new User({
    firstName,
    lastName,
    emailId,
    password:hashPassword,
  }

)
  
    await user.save();
    res.status(200).send("User Added successfully");
  } catch (err) {
    res.status(500).send("error saving the user " + err.message);
  }
});
authRouter.post("/login",async(req,res)=>{
  try{
  const{emailId,password}=req.body;
  const user=await User.findOne({emailId:emailId});
  if(!user){
    throw new Error("Invalid Credential...");

  }
  const isPasswordValid=await bcrypt.compare(password,user.password);
  if(isPasswordValid){

    const token=await user.getJWT();
    // console.log(token);
  res.cookie("token",token);
   
    res.send("Login successfully!!!")
  } 
  else{
    throw new Error("Invalid Credential...");
  }

}
catch (err) {
    res.status(500).send("ERROR: " + err.message);

  }
});
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("logOut successful!!!!")
})
authRouter.patch("/forgetPassword", async (req, res) => {
  try {
    const { email, username } = req.body;
    const userId = email || username;
    const user = await User.findOne({
      $or: [{ email: userId }, { username: userId }],
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credential" });
    }
    //* need to add otp verification of userId

    const { password } = req.body;
    console.log(password);

    if (validator.isStrongPassword(password)) {
      const passwordHash = await bcrypt.hash(password, 10);
      user.password = passwordHash;
      user.save();
      res.status(200).json({ message: "Password Has Been changed" });
    } else {
      throw new Error("Password is not strong");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
authRouter.patch("/changePassword", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ error: "Please login again" });
    }
    const { password, newPassword } = req.body;

    if (validator.isStrongPassword(newPassword)) {
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        console.log(passwordHash);
        user.password = passwordHash;
        user.save();
        res.status(200).json({ message: "Password Has Been changed" });
      } else {
        throw new Error("Password is incorrect");
      }
    } else {
      throw new Error("Password is not strong");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=authRouter;
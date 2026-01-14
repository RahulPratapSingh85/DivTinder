const express=require("express");
const authRouter=express.Router();
const{validateSignUpdata}=require("../utils/validation");
const User = require("../model/user");
const bcrypt=require("bcrypt");

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
module.exports=authRouter;
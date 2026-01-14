const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth");

requestRouter.post("/sendconnection",userAuth,async(req,res)=>{
  const user=req.user;
  console.log("sending a connection request");
  
  res.send( user.firstName+ "connection is success")
})
module.exports=requestRouter;
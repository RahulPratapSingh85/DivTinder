const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middleware/auth");

profileRouter.get("/profile" , userAuth,async (req,res)=>{
  try{
  const user=req.user;
    

  // console.log("user id of with us:" +_id);
  // console.log(cookies);
  res.send(user);
}
catch (err) {
    res.status(500).send("error saving the user " + err.message);
  }
});
module.exports=profileRouter;


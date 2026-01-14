const express=require("express");
const authRouter=express.Router();

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

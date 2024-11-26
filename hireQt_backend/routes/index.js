const express = require("express");
const userRouter = require("./user");
const profileRouter = require("./profile");
const router = express.Router();

router.use("/user",userRouter);
router.use("/profile",profileRouter);
module.exports=router;
const express = require("express");
const z = require("zod");
const {User}=require("../db.js");
const jwt=require("jsonwebtoken");
const {JWT_SECRET} = require("../config.js");
const { authMiddleware } = require("../middleware/middleware.js");

const router = express.Router();

const signupBody=z.object({
    username:z.string().email(),
    password:z.string().min(8,{message:"(Password is too small…)"}),
    firstname:z.string(),
    lastname:z.string(),
});

const signinBody = z.object({
    username: z.string().email(),
	password: z.string()
});

router.post("/signup" , async (req , res)=>{
    const payload = req.body;
    const parsedPayload=signupBody.safeParse(payload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"Email already taken / Incorrect inputs",
        })
        return; 
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const newUser = new User({
        username: payload.username,
        firstname: payload.firstname,
        lastname: payload.lastname,
    });

    newUser.password = await newUser.createHash(payload.password);

    await newUser.save();

    var userId=newUser._id;

    const token=jwt.sign({userId}, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});

router.post("/signin", async (req, res) => {
    const parsedPayload = signinBody.safeParse(req.body);
    if (!parsedPayload.success) {
        return res.status(400).json({
            message: "Invalid input",
        });
    }
    
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password",
        });
    }

    const isPasswordValid = await user.validatePassword(req.body.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid username or password",
        });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
        token: token,
    });
});

module.exports=router;
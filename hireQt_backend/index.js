const express = require("express");
const rootrouter = require("./routes/index");
const cors = require("cors");
const { authMiddleware } = require("./middleware/middleware");
const app =express();


app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,              // Allow credentials (cookies, headers, etc.)
}));

app.use(express.json());
app.get("/" , (req,res)=>{
    res.json("hello WOrld")
})
app.use("/api/v1" , rootrouter);
app.use("/api/v1/genral",authMiddleware,rootrouter)
app.listen(3000);
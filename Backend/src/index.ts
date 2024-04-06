import express from "express";
import cors from "cors";
import jwt,{JwtPayload} from "jsonwebtoken";
import cookieParser from "cookie-parser";

const JWT_authkey = "confidentialInfo";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    //your frontend address to allow
    origin:"http://localhost:5173"
}));

app.post("/signin",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    // dB validation
    // sign takes 3 args payload,secret,options
    const token = jwt.sign({
        //data that you want to include in jwt
        id:1
    },JWT_authkey)
    res.cookie("token",token);
    res.send({
        user:email,
        message:"logged in"
    })


})
app.get("/user",(req,res)=>{
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token,JWT_authkey) as JwtPayload;
    res.send({
        userId: decoded.id
    })
        
    } catch (error) {
        res.send({
            msg:"user not logged in"
        })
        console.error("user not logged in")

        
    }


})
app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.json({
        msg:"user logged out"
    })
})
app.get("/",(req,res)=>{
    res.send("Cookie authentication")
})




app.listen(3000)
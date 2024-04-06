"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const JWT_authkey = "confidentialInfo";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // dB validation
    // sign takes 3 args payload,secret,options
    const token = jsonwebtoken_1.default.sign({
        //data that you want to include in jwt
        id: 1
    }, JWT_authkey);
    res.cookie("token", token);
    res.send({
        user: email,
        message: "logged in"
    });
});
app.get("/user", (req, res) => {
    const token = req.cookies.token;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_authkey);
        res.send({
            userId: decoded.id
        });
    }
    catch (error) {
        res.send({
            msg: "user not logged in"
        });
        console.error("user not logged in");
    }
});
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({
        msg: "user logged out"
    });
});
app.get("/", (req, res) => {
    res.send("Cookie authentication");
});
app.listen(3000);

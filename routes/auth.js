

const router = require("express").Router();

const {Register, Login} = require("../controllers/auth.js");


router.post("/register",Register);

router.post("/login", Login);



module.exports= router ;
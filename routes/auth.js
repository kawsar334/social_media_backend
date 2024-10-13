
const router = require("express").Router();
const {register,login} = require("../controllers/Auth")

router.post("/register",register);
router.post("/login", login);


module.exports= router;



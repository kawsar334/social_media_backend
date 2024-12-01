const router = require("express").Router();
const { Register, Login, Logout } = require("../controllers/auth.js");

// Registration
router.post("/register", Register);

// Login
router.post("/login", Login); 

// Logout
router.get("/logout", Logout);

module.exports = router;

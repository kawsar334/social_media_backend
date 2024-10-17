

const router = require("express").Router();
const {getUsers }= require("../controllers/user");





router.get("/userLists", getUsers);


module.exports = router;

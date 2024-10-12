


const router = require("express").Router();
const { updateuser, deleteuser, getSingleuser, getalleuser, Searchuser, updatePassword, readnotification } = require("../controllers/user");
const { verifyToken } = require("../jwt");


//update user 
router.put("/updateuser/:id",updateuser);
// UPDATE PASSWORD
router.put("/updatepassword/:id", verifyToken, updatePassword);
//delete user
router.delete("/:id", verifyToken,deleteuser);

//get single user 
router.get("/find/:id", getSingleuser);

//get all users
router.get("/", getalleuser); 

//search user
router.get("/search", verifyToken, Searchuser);
// see notification 
router.put("/readnotification/:id", readnotification) ;













module.exports = router;
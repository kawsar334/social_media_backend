

const router = require("express").Router();
const { getUsers, getUserById, updateUser, deleteUser, updatePassword, updateProfilePicture, Follow, unfollow, getMyFollowers,  getMyFollowing } = require("../controllers/user");

const { verifyToken } = require("../jsonwebToken")///req.user.id



// get all user list
router.get("/userLists", getUsers);
// get single user details
router.get("/find/:id", getUserById);
// update a user
router.put("/:id", verifyToken , updateUser);
// UPDATE PASWORD
router.put("/updatedpassword/:id", updatePassword);
// UPSATE PROFILE PICTRUE
router.put("/updatedprofilepicture/:id", verifyToken, updateProfilePicture);
// DELETE A USER .
router.delete("/:id", verifyToken, deleteUser);





module.exports = router;
 
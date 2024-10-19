

const router = require("express").Router();
const { getUsers, getUserById, updateUser, deleteUser, updatePassword, updateProfilePicture, Follow, unfollow, getMyFollowers, getMyFollowing, searchUser, suggestFriend } = require("../controllers/user");

const { verifyToken } = require("../jsonwebToken")///------------req.user.id


// get all user list
router.get("/userLists", getUsers);
// get single user details
router.get("/find/:id", getUserById);
// update a user
router.put("/:id", verifyToken , updateUser);
// UPDATE PASWORD
router.put("/updatedpassword/:id", updatePassword);
// UPdaTE PROFILE PICTRUE
router.put("/updatedprofilepicture/:id", verifyToken, updateProfilePicture);
// follow /
router.put("/follow/:id", verifyToken,Follow)
// unfollow
router.put("/unfollow/:id", verifyToken, unfollow)
// search friend 
router.get("/searchfriends", searchUser);
// DELETE A USER .
router.delete("/:id", verifyToken, deleteUser);
// get suggest friends
router.get("/suggestFriend",verifyToken, suggestFriend);

module.exports = router;
 
const express = require('express');
const router = express.Router();

const { getUsers,getUserId,addUser,updateUser,deleteUser,userFilters, signupUser, loginUser, markUserAsBuyed } = require('../controllers/userController');

router.post("/login", loginUser);
router.post("/signup", signupUser);


router.get("/getAllUser",getUsers)
router.get("/getUserId/:id",getUserId)
router.post("/addUser",addUser)
router.put("/updateUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteUser)
router.post("/userFilters",userFilters)


router.post("/:id/buyed", markUserAsBuyed);


module.exports = router;
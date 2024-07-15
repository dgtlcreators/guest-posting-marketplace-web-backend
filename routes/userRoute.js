const express = require('express');
const router = express.Router();

const { getUsers, signupUser, loginUser } = require('../controllers/userController');

router.get("/",getUsers)
router.post("/login", loginUser);
router.post("/signup", signupUser);


module.exports = router;
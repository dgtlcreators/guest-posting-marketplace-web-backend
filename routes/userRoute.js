const express = require('express');
const router = express.Router();

const { getUsers, signupUser, loginUser, markUserAsBuyed } = require('../controllers/userController');

router.get("/",getUsers)
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/:id/buyed", markUserAsBuyed);


module.exports = router;
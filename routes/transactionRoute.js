const express=require("express");
const { newTransaction, transactionId } = require("../controllers/transactionController.js");
const router = express.Router();


router.post('/create-payment-intent',newTransaction)
router.get('/transactions/:userId',transactionId)

module.exports=router
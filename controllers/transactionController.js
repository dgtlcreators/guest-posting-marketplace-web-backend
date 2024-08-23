const Transaction = require('../models/transaction.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Activity = require('../models/activity.js');

module.exports.newTransaction  =async (req, res) => {
  const { amount, itemId, userId } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    // Save transaction details in the database
    const transaction = new Transaction({
      userId,
      itemId,
      amount,
      currency: 'usd',
      paymentIntentId: paymentIntent.id,
      status: 'pending'
    });

    await transaction.save();

    res.send({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction._id
    });
  } catch (error) {
    res.status(400).send({
      error: { message: error.message },
    });
  }
};

module.exports.transactionId=async (req, res) => {
    const { userId } = req.params;
  
    try {
      const transactions = await Transaction.find({ userId }).populate('itemId');
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

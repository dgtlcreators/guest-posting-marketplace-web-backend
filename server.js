const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log(process.env.STRIPE_SECRET_KEY)

const userRoute=require("./routes/userRoute")
const formRoute=require("./routes/formRoute")
const adminRoute=require("./routes/adminRoute")
const superAdminRoute=require("./routes/superAdminRoute")







const app = express();

connectDB();
const url='https://guest-posting-marketplace-web.netlify.app' ||"http://localhost:3000"
const corsOptions = {
  origin: url,
  credentials: true, // if using cookies or sessions
};
app.use(cors(corsOptions));

/*app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend origin
  credentials: true, // Allow sending cookies
}));*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));



app.get('/complete', async (req, res) => {
  const result = Promise.all([
      stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
      stripe.checkout.sessions.listLineItems(req.query.session_id)
  ])

  console.log(JSON.stringify(await result))

  res.send('Your payment was successful')
})

app.get('/cancel', (req, res) => {
  res.redirect('/')
})


 app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});



app.use("/user", userRoute);
app.use("/form", formRoute);
// app.use("/form", verifyUser, formRoute);
app.use("/admin",adminRoute);
app.use("/superAdmin", superAdminRoute);

app.get("/", (req, res) => {
    res.send("Hello from backend Cheers!!");
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

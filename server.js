const dns = require('dns');
const dnscache = require('dnscache')({
    enable: true,
    ttl: 300, // Time to live in seconds, adjust as needed
    cachesize: 1000 // Cache up to 1000 items
});

// Replace the default DNS servers with Google's public DNS or your preferred DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);






const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log(process.env.STRIPE_SECRET_KEY)


const PDFDocument = require('pdfkit');

const userRoute=require("./routes/userRoute")
const formRoute=require("./routes/formRoute")
const adminRoute=require("./routes/adminRoute")
const superAdminRoute=require("./routes/superAdminRoute");
const transactionRoute = require('./routes/transactionRoute');
const instagramInfluencerRoute = require('./routes/instagramInfluencerRoute');
const fileRoutes = require('./routes/fileRoutes');
const userbrandRoutes = require('./routes/userbrandRoute');
const contentWriterRoute = require('./routes/contentWriterRoute');
const youtubeInfluencerRoute = require('./routes/youtubeInfluencerRoute');
const applyRoute = require('./routes/applyRoute');
const notificationroute = require('./routes/notificationroute');
const savefilterRoute = require('./routes/saveFilterRoute');
const pastActivitiesRoute=require("./routes/pastActivitiesRoute")
const reportroute=require("./routes/reportroute")

const app = express();
connectDB();
/*
app.use(cors({
  origin: 'https://guest-posting-marketplace-web.netlify.app',
  credentials: true  
}));
*/
/*
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));
*/
const allowedOrigins = [
  'https://guest-posting-marketplace.netlify.app',
  'https://guest-posting-marketplace-web.netlify.app',
  'http://localhost:3000', 
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));






app.get('/complete', async (req, res) => {
  try {
    const { session_id } = req.query;

    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Assuming you have a userId stored in the session metadata
    const userId = session.metadata.userId;

    // Update MongoDB entry to mark as bought
    await formData.findByIdAndUpdate(userId, { isBuyied: true });

    // Redirect to /form or any appropriate route
    res.redirect('/form');
  } catch (error) {
    console.error('Error completing payment:', error);
    // Handle error appropriately
    res.redirect('/cancel'); // Redirect to cancel page or handle error
  }
});


app.get('/cancel', (req, res) => {
  res.redirect('/')
})


const User = require('./models/userModel');


/*app.post('users/:id/buyed', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isBuyed = true;
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
});
*/



/* this is usefull
app.post('/create-payment-intent', async (req, res) => {
  const { price } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});*/





app.use("/user", userRoute);
app.use("/form", formRoute);
// app.use("/form", verifyUser, formRoute);
app.use("/admin",adminRoute);
app.use("/superAdmin", superAdminRoute);

app.use('/instagraminfluencers', instagramInfluencerRoute);
app.use('/contentwriters', contentWriterRoute);
app.use('/youtubeinfluencers', youtubeInfluencerRoute);

app.use('/userbrand', userbrandRoutes);
app.use('/applyroute', applyRoute);
app.use('/notificationroute', notificationroute);
app.use('/reportroute', reportroute);
app.use('/savefilterroute', savefilterRoute);

app.use('/pastactivities', pastActivitiesRoute);



app.use("/transaction",transactionRoute);

app.get("/", (req, res) => {
    res.send("Hello from backend Cheers!!");
  });
  app.use('/files', fileRoutes);
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



  app.get('/convert-to-pdf', (req, res) => {
    const imagePath = 'path/to/your/image.png'; // Path to your PNG image
    const pdfPath = 'path/to/save/converted.pdf'; // Path to save the PDF
  
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.image(imagePath, 0, 0, { width: 600 });
    doc.end();
  
    // Send the PDF file to the client
    res.download(pdfPath, 'MediaKit.pdf');
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

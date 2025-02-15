const dns = require('dns');
const dnscache = require('dnscache')({
    enable: true,
    ttl: 300, 
    cachesize: 1000 
});

dns.setServers(['8.8.8.8', '8.8.4.4']);



const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



const PDFDocument = require('pdfkit');
const validator = require('validator');
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
const locationRoute=require("./routes/locationroute")

const app = express();
connectDB();

const allowedOrigins = [
  'https://guest-posting-marketplace.netlify.app',
  'https://guest-posting-marketplace-web.netlify.app',
  'http://localhost:3000',
  'http://connect.creatorsxchange.com',
  'https://connect.creatorsxchange.com'
];

app.use(cors({
  origin: (origin, callback) => {
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


    const session = await stripe.checkout.sessions.retrieve(session_id);


    const userId = session.metadata.userId;


    await formData.findByIdAndUpdate(userId, { isBuyied: true });


    res.redirect('/form');
  } catch (error) {
    console.error('Error completing payment:', error);

    res.redirect('/cancel'); 
  }
});


app.get('/cancel', (req, res) => {
  res.redirect('/')
})


const User = require('./models/userModel');

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

app.use('/locationroute', locationRoute);

app.use('/pastactivities', pastActivitiesRoute);



app.get("/verify", async (req, res) => {
    const { token, email } = req.query;

    if (!token || !email || !validator.isEmail(email)) {
        return res.status(400).send('Invalid request. Please ensure your email and token are valid.');
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User not found for email: ${email}`);
            return res.redirect('http://connect.creatorsxchange.com/error?message=UserNotFound');
            //return res.redirect('https://connect.creatorsxchange.com/error?message=UserNotFound');
        }

        if (user.isVerified) {
         // return res.redirect('http://localhost:3000/error?message=AlreadyVerified');
           // return res.redirect('https://connect.creatorsxchange.com/error?message=AlreadyVerified');
           return res.redirect('http://connect.creatorsxchange.com/error?message=AlreadyVerified');
        }

        if (user.verificationToken !== token || user.tokenExpiry < Date.now()) {
          //return res.redirect('https://cohttp://localhost:3000/error?message=InvalidToken');
         //   return res.redirect('https://connect.creatorsxchange.com/error?message=InvalidToken');
            return res.redirect('http://connect.creatorsxchange.com/error?message=InvalidToken');
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.tokenExpiry = null; // Clear expiry time
        await user.save();

       // res.redirect('http://localhost:3000/verification-success');

       // res.redirect('https://connect.creatorsxchange.com/verification-success');
        res.redirect('http://connect.creatorsxchange.com/verification-success');
    } catch (err) {
        console.error('Error verifying user:', err);
        res.status(500).send('An error occurred. Please try again later.');
    }
});



app.use("/transaction",transactionRoute);

app.get("/", (req, res) => {
    res.send("Hello from backend Cheers!!");
  });
  app.use('/files', fileRoutes);
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



  app.get('/convert-to-pdf', (req, res) => {
    const imagePath = 'path/to/your/image.png'; 
    const pdfPath = 'path/to/save/converted.pdf'; 
  
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.image(imagePath, 0, 0, { width: 600 });
    doc.end();
  

    res.download(pdfPath, 'MediaKit.pdf');
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
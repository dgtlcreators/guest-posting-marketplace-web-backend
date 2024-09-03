const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const Grid = require('gridfs-stream');

let gfs;

const connectDB = async () => {
    const url = process.env.MONGO_URI || "mongodb+srv://guest-posting-marketplace-web:guest-posting-marketplace-web@cluster0.kjvasef.mongodb.net/guest-posting-marketplace-web?retryWrites=true&w=majority&appName=Cluster0";
    
    try {
        // Start timing the database connection
        const dbConnectStart = Date.now();
        const conn = await mongoose.connect(url, {
            dbName: "guest-posting-marketplace-web"
        });
        const dbConnectEnd = Date.now();
        console.log(`Database connection took ${dbConnectEnd - dbConnectStart} ms`);

        gfs = Grid(conn.connection.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log('MongoDB connected');

        // Start timing Super Admin check
        const superAdminCheckStart = Date.now();
        const superAdmin = await User.findOne({ role: 'Super Admin' });
        const superAdminCheckEnd = Date.now();
        console.log(`Checking for Super Admin took ${superAdminCheckEnd - superAdminCheckStart} ms`);
        
        if (!superAdmin) {
            const createSuperAdminStart = Date.now();
            const defaultSuperAdmin = new User({
                name: 'Default Super Admin',
                email: 'superadmin@example.com',
                password: await bcrypt.hash('superadminpassword', 10),
                role: 'Super Admin'
            });
            await defaultSuperAdmin.save();
            const createSuperAdminEnd = Date.now();
            console.log(`Creating Super Admin took ${createSuperAdminEnd - createSuperAdminStart} ms`);
        } else {
            console.log('Default Super Admin already created');
        }

        // Start timing Admin check
        const adminCheckStart = Date.now();
        const admin = await User.findOne({ role: 'Admin' });
        const adminCheckEnd = Date.now();
        console.log(`Checking for Admin took ${adminCheckEnd - adminCheckStart} ms`);
        
        if (!admin) {
            const createAdminStart = Date.now();
            const defaultAdmin = new User({
                name: 'Default Admin',
                email: 'admin@example.com',
                password: await bcrypt.hash('adminpassword', 10),
                role: 'Admin'
            });
            await defaultAdmin.save();
            const createAdminEnd = Date.now();
            console.log(`Creating Admin took ${createAdminEnd - createAdminStart} ms`);
        } else {
            console.log('Default Admin already created');
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;



/*const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt=require("bcryptjs")
const Grid = require('gridfs-stream');

let gfs;

const connectDB = async () => {
    const url=process.env.MONGO_URI || "mongodb+srv://guest-posting-marketplace-web:guest-posting-marketplace-web@cluster0.kjvasef.mongodb.net/guest-posting-marketplace-web?retryWrites=true&w=majority&appName=Cluster0"
    try {
        const dbConnectStart = Date.now();
        const conn =  await mongoose.connect(url, {
        
            dbName:"guest-posting-marketplace-web",
           // useNewUrlParser: true,
           // useUnifiedTopology: true, 
           // poolSize: 10, 
          //  serverSelectionTimeoutMS: 5000,
        });
        
        
        const dbConnectEnd = Date.now();
        console.log(`Database connection took ${dbConnectEnd - dbConnectStart} ms`);
        gfs = Grid(conn.connection.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log('MongoDB connected');

        const superAdmin = await User.findOne({ role: 'Super Admin' });
        if (!superAdmin) {
            const defaultSuperAdmin = new User({
                name: 'Default Super Admin',
                email: 'superadmin@example.com',
                password: await bcrypt.hash('superadminpassword', 10),
                role: 'Super Admin'
            });
            await defaultSuperAdmin.save();
            console.log('Default Super Admin created');
        }else{
            console.log('Default Super Admin already created');
        }
        const admin = await User.findOne({ role: 'Admin' });
        if (!admin) {
            const defaultSuperAdmin = new User({
                name: 'Default Admin',
                email: 'admin@example.com',
                password: await bcrypt.hash('adminpassword', 10),
                role: 'Admin'
            });
            await defaultSuperAdmin.save();
            console.log('Default Admin created');
        }else{
            console.log('Default Admin already created');
        }

      /*  async function listIndexes() {
            const url = process.env.MONGO_URI || 'your-mongodb-connection-string';
            await mongoose.connect(url, { dbName: 'guest-posting-marketplace-web' });
          
            const collection = mongoose.connection.db.collection('activities');
            const indexes = await collection.indexes();
          
            console.log("indexes",indexes);
            mongoose.disconnect();
          }
          
          listIndexes();
          async function dropIndex() {
            const url = process.env.MONGO_URI || 'your-mongodb-connection-string';
            await mongoose.connect(url, { dbName: 'guest-posting-marketplace-web' });
          
            const collection = mongoose.connection.db.collection('activities');
            await collection.dropIndex('contentWriter.email_1');
          
            console.log('Index dropped');
            mongoose.disconnect();
          }
          
          dropIndex();///end place
    } 
     catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;*/


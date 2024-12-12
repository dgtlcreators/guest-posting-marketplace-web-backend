const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const Grid = require('gridfs-stream');

let gfs;

const connectDB = async () => {
     const url =  "mongodb+srv://database_creators:GjSWaV7mJnOy5hJw@cluster0.lwyhn.mongodb.net";
   // const url = process.env.MONGO_URI || "mongodb+srv://guest-posting-marketplace-web:guest-posting-marketplace-web@cluster0.kjvasef.mongodb.net/guest-posting-marketplace-web?retryWrites=true&w=majority&appName=Cluster0";
console.log("MONDO DB URL ",url)
    try {

        const dbConnectStart = process.hrtime();


        const conn = await mongoose.connect(url, {
            // dbName: "guest-posting-marketplace-web",
            dbName: "CreatorsDB",
            maxPoolSize: 10,//10,
            serverSelectionTimeoutMS:2000,// 3000,
           // keepAlive: true,
           // keepAliveInitialDelay: 300000
        // autoIndex: false,
           connectTimeoutMS:10000, //5000,  
           socketTimeoutMS: 20000,//45000,
         
           
        });
        

        
        const dbConnectEnd = process.hrtime(dbConnectStart);
        console.log(`Database connection took ${dbConnectEnd[0]} seconds and ${dbConnectEnd[1] / 1000000} milliseconds`);

        gfs = Grid(conn.connection.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log('MongoDB connected');

        const checkAndCreateUser = async (role, name, email, password) => {
            const userCheckStart = process.hrtime();
            const user = await User.findOne({ role });

            const userCheckEnd = process.hrtime(userCheckStart);
            console.log(`Checking for ${role} took ${userCheckEnd[0]} seconds and ${userCheckEnd[1] / 1000000} milliseconds`);

            if (!user) {
                const newUser = new User({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    role,
                    isVerified: true, 
                });
                await newUser.save();
                console.log(`${role} created`);
            } else {
                console.log(`${role} already created`);
            }
        };

        await checkAndCreateUser('Super Admin', 'Default Super Admin', 'superadmin@example.com', 'superadminpassword');
        await checkAndCreateUser('Admin', 'Default Admin', 'admin@example.com', 'adminpassword');

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
        const dbConnectStart = process.hrtime();
        const conn =  await mongoose.connect(url, {
        
            dbName:"guest-posting-marketplace-web",
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // poolSize: 10,
           maxPoolSize: 10, 
            serverSelectionTimeoutMS: 3000,
        });
        const dbConnectEnd = process.hrtime(dbConnectStart);
        console.log(`Database connection took ${dbConnectEnd[0]} seconds and ${dbConnectEnd[1] / 1000000} milliseconds`);

        
        

        gfs = Grid(conn.connection.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log('MongoDB connected');

        const superAdminCheckStart = process.hrtime();

        const superAdmin = await User.findOne({ role: 'Super Admin' });

        const superAdminCheckEnd = process.hrtime(superAdminCheckStart);
        console.log(`Checking for Super Admin took ${superAdminCheckEnd[0]} seconds and ${superAdminCheckEnd[1] / 1000000} milliseconds`);
        

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

        const adminCheckStart = process.hrtime();
        const admin = await User.findOne({ role: 'Admin' });
        const adminCheckEnd = process.hrtime(adminCheckStart);
        console.log(`Checking for Admin took ${adminCheckEnd[0]} seconds and ${adminCheckEnd[1] / 1000000} milliseconds`);
        
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
          
          dropIndex();//end place
    } 
     catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

*/
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt=require("bcryptjs")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        
            dbName:"guest-posting-marketplace-web"
        });
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
    } 
     catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;



const User=require("../models/userModel.js");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userActionModel = require("../models/UserInstagramInfluencer.js");
const Activity = require('../models/activity.js');

const SibApiV3Sdk = require('sib-api-v3-sdk');
const crypto = require('crypto');




let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =  process.env.BREVO_API_KEY


const sendVerificationEmail = async (email, verificationToken) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = { name: "CreatorXChange", email: "creatorsxchange@gmail.com" };
  sendSmtpEmail.subject = "Email Verification - CreatorXChange";
  const frontendUrl="https://guest-posting-marketplace-web-backend-mu57.onrender.com"
  // const frontendUrl="http://localhost:5000"

  sendSmtpEmail.htmlContent = `
   <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 16px; background-color: #F9FAFB; font-family: 'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;">
    <div style="background-color: #fff; padding: 32px; border-radius: 12px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); max-width: 640px; width: 100%;">
        <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="font-size: 24px; font-weight: 600; color: #1D4ED8;">Welcome to CreatorsXchange!</h2>
        </div>
        <div style="text-align: center; margin-bottom: 24px;">
            <p style="font-size: 18px; color: #4B5563;">
                Thank you for registering with CreatorsXchange! To complete your sign-up process and activate your account, please verify your email by clicking the button below:
            </p>
        </div>
        <div style="text-align: center; margin-bottom: 24px;">
            <a href="${frontendUrl}/verify?token=${verificationToken}&email=${email}" 
              style="display: inline-block; background-color: #2563EB; color: #fff; font-size: 18px; font-weight: bold; padding: 12px 24px; border-radius: 9999px; text-decoration: none; transition: background-color 0.3s, transform 0.3s;">
                Verify Email
            </a>
        </div>
        <div style="text-align: center; margin-top: 24px;">
            <p style="font-size: 14px; color: #6B7280;">
                If you did not sign up for CreatorsXchange, please ignore this email or <a href="mailto:partner@creatorsxchange.com" style="color: #2563EB; text-decoration: underline;">contact us</a>.
            </p>
        </div>
        <div style="text-align: center; margin-top: 16px; font-size: 14px; color: #6B7280;">
            <p>CreatorXChange Team | <a href="https://creatorsxchange.com" style="color: #2563EB; text-decoration: underline;">www.creatorxchange.com</a></p>
        </div>
    </div>
</div>
  `;


  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

module.exports.signupUser = async (req, res) => {
  try {
    const { name, email, password, role , confirmPassword } = req.body;


    const user = await User.findOne({ email });
    if (user) {
    
      return res.status(400).json({ message: "User already exists" });
    }
   
 
    const hashPassword = await bcryptjs.hash(password, 10);


    const verificationToken = crypto.randomBytes(32).toString('hex');

   
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      verificationToken 
    });

  
    await sendVerificationEmail(email, verificationToken);


    res.status(200).json({
      message: "User created successfully. Please check your email to verify your account.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error,
    });
  }
};


module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    

    const user = await User.findOne({ email });
    
  
    if (!user) {
 
      return res.status(404).json({ message: "User not found" });
    }

   
    const isHashedPassword = user?.password.length >= 60; 
   
    let isMatch;
    if (isHashedPassword) {
     
      isMatch = await bcryptjs.compare(password, user.password);
    } else {
      
      isMatch = password === user.password;
    }

    
    if (!user || !isMatch) {
  
      return res.status(400).json({ message: "Invalid email or password" });
    }
    

    const token = jwt.sign({ email: user.email }, "jwt-secret", {
      expiresIn: "300",
    });
    console.log("token ",token)
   
    res.cookie("token", token);
    await userActionModel.create({ userId: user._id, action: 'User logged in' });
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User Email Invalid Credentials",
      success: false,
      error: error,
    });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error,
    });
  }
};
module.exports.getUserId=async(req,res)=>{
  try {
    const user=await User.findById(req.params.id)
    if(!user) return res.status(404).json({meassage:"User not found"})
    res.status(200).json({message:"User By Id fetch data successfully",data:user})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
}

module.exports.addUser= async (req, res) => {
  const { name, email, password, role, permissions } = req.body;

  try {
    const user = new User({ name, email, password, role, permissions });
    await user.save();
    res.status(201).json({ message: 'User added successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.updateUser=async(req,res)=>{
  try {
    console.log("req.body ",req.body)
    const updatedData=req.body
    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    console.log("user ",user); 
    
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully", data: user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const buildPermissionFilter = (module, action, value) => {
  if (value === false) {
    return {
      $or: [
        { [`permissions.${module}.${action}`]: false }, 
        { [`permissions.${module}.${action}`]: { $exists: false } } 
      ]
    };
  } else {
    return { [`permissions.${module}.${action}`]: value }; 
  }
};

module.exports.userFilters = async (req, res) => {
  try {
    const {
      role,
      instagramAdd, instagramEdit, instagramDelete, instagramBookmark, instagramApply,instagramProfile,instagramShowProfile,instagramFilter,
      youtubeAdd, youtubeEdit, youtubeDelete, youtubeBookmark, youtubeApply, youtubeProfile,youtubeShowProfile,youtubeFilter,
      contentWriterAdd, contentWriterEdit, contentWriterDelete, contentWriterBookmark, contentWriterApply, contentWriterProfile,contentWriterShowProfile,contentWriterFilter,
      guestPostAdd, guestPostEdit, guestPostDelete, guestPostBookmark, guestPostApply, guestPostProfile,guestPostShowProfile,guestPostFilter
    } = req.body;

    let filter = {};


    if (role) filter.role = role;


    const permissionFields = [
      ['instagram', 'add', instagramAdd],
      ['instagram', 'edit', instagramEdit],
      ['instagram', 'delete', instagramDelete],
      ['instagram', 'bookmark', instagramBookmark],
      ['instagram', 'apply', instagramApply],
      ['instagram', 'profile', instagramProfile],
      ['instagram', 'showprofile', instagramShowProfile],
      ['instagram', 'filter', instagramFilter],
      ['youtube', 'add', youtubeAdd],
      ['youtube', 'edit', youtubeEdit],
      ['youtube', 'delete', youtubeDelete],
      ['youtube', 'bookmark', youtubeBookmark],
      ['youtube', 'apply', youtubeApply],
      ['youtube', 'profile', youtubeProfile],
      ['youtube', 'showprofile', youtubeShowProfile],
      ['youtube', 'filter', youtubeFilter],
      ['contentWriter', 'add', contentWriterAdd],
      ['contentWriter', 'edit', contentWriterEdit],
      ['contentWriter', 'delete', contentWriterDelete],
      ['contentWriter', 'bookmark', contentWriterBookmark],
      ['contentWriter', 'apply', contentWriterApply],
      ['contentWriter', 'profile', contentWriterProfile],
      ['contentWriter', 'showprofile', contentWriterShowProfile],
      ['contentWriter', 'filter', contentWriterFilter],
      ['guestPost', 'add', guestPostAdd],
      ['guestPost', 'edit', guestPostEdit],
      ['guestPost', 'delete', guestPostDelete],
      ['guestPost', 'bookmark', guestPostBookmark],
      ['guestPost', 'apply', guestPostApply],
      ['guestPost', 'profile', guestPostProfile],
      ['guestPost', 'showprofile', guestPostShowProfile],
      ['guestPost', 'filter', guestPostFilter],
    ];

    permissionFields.forEach(([module, action, value]) => {
      if (value !== undefined) {
        const permissionFilter = buildPermissionFilter(module, action, value);
        Object.assign(filter, permissionFilter);
      }
    });

   


    const users = await User.find(filter);
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports.deleteUser=async(req,res)=>{
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message:"User deleted successfull",data:user})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.markUserAsBuyed=async (req, res) =>{
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.save();
    res.json({
      message: "User marked as buyed successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
}

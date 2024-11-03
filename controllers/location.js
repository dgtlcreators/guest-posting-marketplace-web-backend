const User=require("../models/userModel.js");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userActionModel = require("../models/UserInstagramInfluencer.js");
const Activity = require('../models/activity.js');

const SibApiV3Sdk = require('sib-api-v3-sdk');
const crypto = require('crypto');



// export const signupUser = async(req,res) => {
//     try {
//         const {name, email, password,role} = await req.body;
//         const user = await User.findOne({email});
//         if(user){
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const hashPassword = await bcryptjs.hash(password, 10);
//         const response = await User.create({name,email,password: hashPassword});
//         res.status(200).json({
//             message: "User created successfully",
//             success: true,
//             user: response
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: "Something went wrong",
//             success: false,
//             error: error
//         })
        
//     }
// }


let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey =  process.env.BREVO_API_KEY;


const sendVerificationEmail = async (email, verificationToken) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = { name: "CreatorXChange", email: "myfromemail@mycompany.com" };
  sendSmtpEmail.subject = "Email Verification - CreatorXChange";
  sendSmtpEmail.htmlContent = `
    <h2>Welcome to CreatorXChange!</h2>
    <p>Please verify your email by clicking the link below:</p>
    <a href="http://your-frontend-url.com/verify?token=${verificationToken}&email=${email}">Verify Email</a>
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
    const { name, email, password, role } = req.body;

   
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
      verificationToken ,
      
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


/*
module.exports.signupUser = async (req, res) => {
  try {
    // Destructure request body
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const response = await User.create({ name, email, password: hashPassword });

    // Set a cookie upon successful signup
    // res.cookie("userId", response._id, { httpOnly: true });
    res.status(200).json({
      message: "User created successfully",
      success: true,
      user: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error,
    });
  }
};*/

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    //console.log("email, password ",email, password )

    const user = await User.findOne({ email });
    //console.log("user ",user)
   
   // const isMatch = await bcryptjs.compare(password, user.password);
    const isHashedPassword = user.password.length >= 60; 

    let isMatch;
    if (isHashedPassword) {
     
      isMatch = await bcryptjs.compare(password, user.password);
    } else {
      
      isMatch = password === user.password;
    }

    //console.log("isMatch ",isMatch)
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Set a cookie upon successful login
    
    const token = jwt.sign({ email: user.email }, "jwt-secret", {
      expiresIn: "300",
    });
    console.log("token ",token)
    // console.log(token)
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
        { [`permissions.${module}.${action}`]: false }, // Field is explicitly false
        { [`permissions.${module}.${action}`]: { $exists: false } } // Field does not exist
      ]
    };
  } else {
    return { [`permissions.${module}.${action}`]: value }; // For true
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

    // Role filter
    if (role) filter.role = role;

    // Permissions filters
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

    // Log the final filter
    //console.log('Filter:', filter);

    const users = await User.find(filter);
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/*module.exports.userFilters2=async(req,res)=>{
  try {
    const { name, 
      email, 
      role, 
      instagramAdd, 
      instagramEdit, 
      instagramDelete, 
      instagramBookmark, 
      instagramApply,
      youtubeAdd,
      youtubeEdit,
      youtubeDelete,
      youtubeBookmark,
      youtubeApply,
      contentWriterAdd,
      contentWriterEdit,
      contentWriterDelete,
      contentWriterBookmark,
      contentWriterApply,
      guestPostAdd,
      guestPostEdit,
      guestPostDelete,
      guestPostBookmark,
      guestPostApply } = req.query;

    let filter = {};

    if (name) filter.name ={$regex:new RegExp(name,'i')} 
    if (email) filter.email ={$regex:new RegExp(email,'i')}// new RegExp(email, 'i');
    if (role) filter.role = role;

  //  if (instagramAdd) filter['permissions.instagram.add'] = instagramAdd === 'true';
    
    //if (instagramEdit) filter['permissions.instagram.edit'] = instagramEdit === 'true'; 
   // if (youtubeBookmark) filter['permissions.youtube.bookmark'] = youtubeBookmark === 'true';
   // if (guestPostApply) filter['permissions.guestPost.apply'] = guestPostApply === 'true';
   if (instagramAdd !== undefined) {
    filter['permissions.instagram.add'] = instagramAdd === 'true';
  }
  if (instagramEdit !== undefined) {
    filter['permissions.instagram.edit'] = instagramEdit === 'true';
  }
  if (instagramDelete !== undefined) {
    filter['permissions.instagram.delete'] = instagramDelete === 'true';
  }
  if (instagramBookmark !== undefined) {
    filter['permissions.instagram.bookmark'] = instagramBookmark === 'true';
  }
  if (instagramApply !== undefined) {
    filter['permissions.instagram.apply'] = instagramApply === 'true';
  }

  // Add filters for YouTube permissions
  if (youtubeAdd !== undefined) {
    filter['permissions.youtube.add'] = youtubeAdd === 'true';
  }
  if (youtubeEdit !== undefined) {
    filter['permissions.youtube.edit'] = youtubeEdit === 'true';
  }
  if (youtubeDelete !== undefined) {
    filter['permissions.youtube.delete'] = youtubeDelete === 'true';
  }
  if (youtubeBookmark !== undefined) {
    filter['permissions.youtube.bookmark'] = youtubeBookmark === 'true';
  }
  if (youtubeApply !== undefined) {
    filter['permissions.youtube.apply'] = youtubeApply === 'true';
  }

  // Add filters for Content Writer permissions
  if (contentWriterAdd !== undefined) {
    filter['permissions.contentWriter.add'] = contentWriterAdd === 'true';
  }
  if (contentWriterEdit !== undefined) {
    filter['permissions.contentWriter.edit'] = contentWriterEdit === 'true';
  }
  if (contentWriterDelete !== undefined) {
    filter['permissions.contentWriter.delete'] = contentWriterDelete === 'true';
  }
  if (contentWriterBookmark !== undefined) {
    filter['permissions.contentWriter.bookmark'] = contentWriterBookmark === 'true';
  }
  if (contentWriterApply !== undefined) {
    filter['permissions.contentWriter.apply'] = contentWriterApply === 'true';
  }

  // Add filters for Guest Post permissions
  if (guestPostAdd !== undefined) {
    filter['permissions.guestPost.add'] = guestPostAdd === 'true';
  }
  if (guestPostEdit !== undefined) {
    filter['permissions.guestPost.edit'] = guestPostEdit === 'true';
  }
  if (guestPostDelete !== undefined) {
    filter['permissions.guestPost.delete'] = guestPostDelete === 'true';
  }
  if (guestPostBookmark !== undefined) {
    filter['permissions.guestPost.bookmark'] = guestPostBookmark === 'true';
  }
  if (guestPostApply !== undefined) {
    filter['permissions.guestPost.apply'] = guestPostApply === 'true';
  }

    
    const users = await User.find(filter)

    res.status(200).json({message:"User deleted successfull",data:users})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.userFilters1 = async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      instagramAdd,
      instagramEdit,
      instagramDelete,
      instagramBookmark,
      instagramApply,
      youtubeAdd,
      youtubeEdit,
      youtubeDelete,
      youtubeBookmark,
      youtubeApply,
      contentWriterAdd,
      contentWriterEdit,
      contentWriterDelete,
      contentWriterBookmark,
      contentWriterApply,
      guestPostAdd,
      guestPostEdit,
      guestPostDelete,
      guestPostBookmark,
      guestPostApply,
    } = req.body;
console.log(req.body)
    let filter = {};

    // Text filters
    if (name) filter.name ={$regex:new RegExp(name,'i')} 
    if (email) filter.email ={$regex:new RegExp(email,'i')}// new RegExp(email, 'i');
    if (role) filter.role = role;

    // Permissions filters
    const permissionFields = [
      'instagramAdd',
      'instagramEdit',
      'instagramDelete',
      'instagramBookmark',
      'instagramApply',
      'youtubeAdd',
      'youtubeEdit',
      'youtubeDelete',
      'youtubeBookmark',
      'youtubeApply',
      'contentWriterAdd',
      'contentWriterEdit',
      'contentWriterDelete',
      'contentWriterBookmark',
      'contentWriterApply',
      'guestPostAdd',
      'guestPostEdit',
      'guestPostDelete',
      'guestPostBookmark',
      'guestPostApply',
    ];

    permissionFields.forEach(field => {
      const [module, action] = field.split(/(?=[A-Z])/).map(part => part.toLowerCase());
      if (req.query[field] !== undefined) {
        filter[`permissions.${module}.${action}`] = req.query[field] === 'true';
      }
    });

    // Find users with the applied filters
    const users = await User.find(filter);

    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

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



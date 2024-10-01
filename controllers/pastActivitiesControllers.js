const Activity = require('../models/activity.js');

const User = require('../models/userModel.js'); 

async function getUserDetails(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
}
module.exports.createPastActivities1 = async (req, res) => {
    try {
        const { userId, action, section, role, details } = req.body;

        const user = await getUserDetails(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const today = new Date();
        const dateKey = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Convert details to a string for comparison
        const detailsString = JSON.stringify(details);

        // Check for existing activity with the same userId, action, section, and same day
        const existingActivity = await Activity.findOne({
            userId,
            action,
            section,
            role,
            createdAt: { $gte: dateKey, $lt: new Date(dateKey.getTime() + 86400000) }, 
        });

        if (existingActivity) {
            // Update the existing activity's updatedAt and details
            existingActivity.updatedAt = new Date(); // Set to the current timestamp
            existingActivity.details = detailsString; // Update details
            await existingActivity.save();

            return res.status(200).json({
                message: 'Activity updated successfully',
                data: existingActivity,
            });
        }

        // If no existing activity, create a new one
        const activity = new Activity({
            userId,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            action,
            section,
            details: detailsString, // Save as a string
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await activity.save();

        res.status(201).json({
            message: 'Activity created successfully',
            data: activity,
        });
    } catch (error) {
        console.error('Error saving activity:', error.message, error.stack);
        res.status(500).json({
            message: 'Failed to create activity',
            error: error.message,
        });
    }
};







module.exports.createPastActivities = async (req, res) => {
    try {
        const { userId, action, section, role, details } = req.body;

        const user = await getUserDetails(userId); 
      //console.log(user)
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

      /*  const today = new Date();
        const dateKey = new Date(today.getFullYear(), today.getMonth(), today.getDate());


        const existingActivity = await Activity.findOne({
            userId,
            date: { $gte: dateKey, $lt: new Date(dateKey.getTime() + 86400000) }, 
        });

        if (existingActivity) {
         
            existingActivity.action = action;
            existingActivity.details = details;
            existingActivity.updatedAt = new Date(); 
            
            await existingActivity.save();

            return res.status(200).json({
                message: 'Activity updated successfully',
                data: existingActivity,
            });
        }*/

        const activity = new Activity({
            userId,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            action,
            section,
            details,
         //  date: dateKey, 
        });

        await activity.save();

        res.status(201).json({
            message: 'Activity created successfully',
            data: activity,
        });
    } catch (error) {
        console.error('Error saving activity:', error.message, error.stack);
        res.status(500).json({
            message: 'Failed to create activity',
            error: error.message,
        });
    }
};


/*module.exports.createPastActivities1 = async (req, res) => {
    try {
       // console.log(req.body);
        const { userId, action, section, role, details } = req.body;
        const user = await getUserDetails(userId);
        
        if (!userId || !action || !section || !role) {
           // throw new Error('Missing required fields');
        }
        if (!user) {
          //  return res.status(404).json({message: 'User not found',});
        }

        const activity = new Activity({
            userId,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            action,
            section,
            role,
            details,
            
        });

        

        await activity.save();

        res.status(201).json({
            message: 'Activity created successfully',
            data: activity
        });
    } catch (error) {
        // Log detailed error information
        console.error('Error saving activity:', error.message, error.stack);
        res.status(500).json({
            message: 'Failed to create activity',
            error: error.message
        });
    }
};
*/


 module.exports.getAllPastActivities = async (req, res) => {
    try {
       
        const activities = await Activity.find()//.populate('userId'); 
        res.status(200).json({message:"Fetch data successfully",data:activities}); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch past activities', error: error.message });
    }
};
module.exports.getPastActivitiesById = async (req, res) =>{
    try {
        const { userId } = req.params;
         // console.log(req)
        // Find activities by user ID
        const activities = await Activity.findById(req.params.id);

        if (activities.length === 0) {
            return res.status(404).json({
                message: 'No activities found for this user'
            });
        }

       
        res.status(200).json({
            message: 'Activities fetched successfully',
            data: activities
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch activities',
            error: error.message
        });
    }
}
module.exports.filterPastActivitiesByUserId=async(req,res)=>{
    try {
        // Extract userId from request parameters
        const { userId } = req.params;

        const { action, section, role, timestampStart, timestampEnd } = req.query;
//66b06ba4f3ed9f604519137e/filter?action=Updated Profile&section=Instagram Influencer&role=Admin&timestampStart=2024-08-01T00:00:00Z&timestampEnd=2024-08-31T23:59:59Z
        let query = { userId };

        if (action) {
            query.action = action;
        }
        if (section) {
            query.section = section;
        }
        if (role) {
            query.role = role;
        }
        if (timestampStart || timestampEnd) {
            query.timestamp = {};
            if (timestampStart) {
                query.timestamp.$gte = new Date(timestampStart);
            }
            if (timestampEnd) {
                query.timestamp.$lte = new Date(timestampEnd);
            }
        }

        const activities = await Activity.find(query);

        if (activities.length === 0) {
            return res.status(404).json({
                message: 'No activities found for this user with the given filters'
            });
        }

        res.status(200).json({
            message: 'Filtered activities fetched successfully',
            data: activities
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch filtered activities',
            error: error.message
        });
    }
}

module.exports.updatePastActivities=async(req,res)=>{
    try {
        const updatedData={...req.body}
        const pastActivities=await Activity.findByIdAndUpdate(req.params.id,updatedData,{new:true})
        if(!pastActivities) res.status(404).json({message:"PastActivity not found"})
        res.status(200).json({message:"Past Activity updated successfully",data:pastActivities})
    } catch (error) {
        res.status(500).json({message:"Error Past Activity updated successfully",error})
    }
}

module.exports.deletePastActivities=async(req,res)=>{
    try {
        const pastActivities=await Activity.findByIdAndDelete(req.params.id)
        if(!pastActivities) res.status(404).json({message:"PastActivity not found"})
        res.status(200).json({message:"Past Activity deleted successfully",data:pastActivities})
    } catch (error) {
        res.status(500).json({message:"Error Past Activity deleted successfully",error})
    }
}
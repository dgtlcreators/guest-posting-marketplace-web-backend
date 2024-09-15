const SaveFilter = require('../models/savefilterModel.js'); 
const mongoose = require('mongoose');

module.exports.getallsavefilter=async(req,res)=>{
    try {
        const savefilter=await SaveFilter.find()

        res.status(200).json({message:"Get all save filter successfully",data:savefilter})
        
    } catch (error) {
        res.status(500).json({message:"Failed Get all save filtery",error})
    }
}

module.exports.getsavefilterbyid = async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            //return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const savefilter = await SaveFilter.findById(id);

        if (!savefilter) {
            return res.status(404).json({ message: "Save filter not found" });
        }

        res.status(200).json({ message: "Save filter Updated Successfully", data: savefilter });

    } catch (error) {
        console.error("Error getting save filter by ID:", error);
        res.status(500).json({ message: "Failed to get save filter", error: error.message || error });
    }
};


module.exports.createsavefilter=async(req,res)=>{
    try {
        const savefilter=new SaveFilter(req.body)
        await savefilter.save()

        res.status(200).json({message:"Create save filter successfully",data:savefilter})
        
    } catch (error) {
        res.status(500).json({message:"Failed create save filtery",error})
    }
}

module.exports.updatesavefilter = async (req, res) => {
    const id = req.params.id;
    console.log('Received ID:', id);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
       // return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    try {
        const savefilter = await SaveFilter.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!savefilter) {
            return res.status(404).json({ message: "Save filter not found" ,data:savefilter});
        }

        res.status(200).json({ message: "Updated save filter successfully", data: savefilter });

    } catch (error) {
        console.error("Error updating save filter:", error);
        res.status(500).json({ message: "Failed to update save filter", error: error.message || error });
    }
};

module.exports.deletesavefilter = async (req, res) => {
    const id = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        //return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    try {
        const result = await SaveFilter.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Save filter not found" });
        }

        res.status(200).json({ message: "Save filter deleted successfully" ,data:result});

    } catch (error) {
        console.error("Error deleting save filter:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Failed to delete save filter", error: error.message || error });
        }
    }
};


const express=require("express");
const router = express.Router();

const {
    getAllContentWriters,
    createContentWriter,
  getContentWriterById,
  updateContentWriter,
  deleteContentWriter,getFilteredContentWriters
  //getFilteredcontentWriter,
  //addcontentWriterContactSpecificId,
 // getAllContentWriterContactData,
 // getcontentWriterContactsByPublisherId,
 
} =require("../controllers/contentWriterController.js");
const {
    
    addContactSpecificId,
    getAllContactData,
    getContactsByPublisherId,
   
  } =require("../controllers/superAdminController.js");


// route.post("/getRequest", getRequest);





router.get('/getallcontentwriters', getAllContentWriters);
router.post('/createcontentwriter', createContentWriter);
router.get('/getcontentwriter/:id', getContentWriterById);
router.put('/updatecontentwriter/:id', updateContentWriter);
router.delete('/deletecontentwriter/:id', deleteContentWriter);
router.post('/contentWritersFilter', getFilteredContentWriters);

//router.post("/getFilteredAdminData", getFilteredcontentWriter);



router.post("/addContact",addContactSpecificId)
router.get("/getContact",getAllContactData)
router.get("/getContactsByPublisher/:publisherId", getContactsByPublisherId);
//router.post("/addContact",addcontentWriterContactSpecificId)
//router.get("/getContact",getAllContentWriterContactData)
//router.get("/getContactsByPublisher/:publisherId", getcontentWriterContactsByPublisherId);

module.exports= router;
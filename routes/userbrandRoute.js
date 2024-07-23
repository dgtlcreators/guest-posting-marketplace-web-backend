const express = require('express');
const router = express.Router();
const {
    filterInstagramInfluencers,
    submitForm,
    getData,
    getFilteredData,
    getRequest,
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationById,
    deleteApplicationById,
    appliacationByInfluencerId
  } = require('../controllers/userbrandControllers');
const instagramInfluencerModel = require('../models/instagramInfluencerModel');
  
  // Routes
  router.post('/submit', submitForm);
  router.get('/getData', getData);
  router.post('/getFilteredData', getFilteredData);
  router.post('/getRequest', getRequest);
router.post('/filter', filterInstagramInfluencers);

router.post('/addapplications', createApplication);
router.get('/getinfluencerApplications/:influencerId',appliacationByInfluencerId)
router.get('/getallapplications', getAllApplications);
router.get('/getapplications/:id', getApplicationById);
router.put('/editapplications/:id',updateApplicationById);
router.delete('/deleteapplications/:id', deleteApplicationById);



module.exports = router;

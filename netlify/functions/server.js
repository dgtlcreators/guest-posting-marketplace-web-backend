const server = require("../../server"); 
const serverless = require('serverless-http');

module.exports.handler = serverless(server);  

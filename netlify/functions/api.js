// netlify/functions/api.js
const { createServer } = require('http');
const app = require('../../server'); // Import the Express app from server.js

module.exports.handler = async (event, context) => {
  // Create a mock request object
  const req = {
    method: event.httpMethod,
    url: event.path,
    headers: event.headers || {},
    body: event.body ? JSON.parse(event.body) : null,
    queryStringParameters: event.queryStringParameters || {}
  };

  // Create a mock response object
  const res = {
    statusCode: 200,
    body: '',
    headers: {
      'Content-Type': 'application/json'
    },
    setHeader(name, value) {
      this.headers[name] = value;
    },
    send(body) {
      this.body = body;
    },
    end() {
      return {
        statusCode: this.statusCode,
        body: this.body,
        headers: this.headers
      };
    }
  };

  // Create the HTTP server using the Express app and mock the request/response
  return new Promise((resolve, reject) => {
    const server = createServer(app);
    
    // Emit the request manually to Express
    server.emit('request', req, res);
    
    // Resolve with the response once finished
    res.end = () => resolve(res);
    res.on('error', reject);
  });
};

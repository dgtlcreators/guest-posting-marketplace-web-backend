module.exports.handler = async function(event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'This is a test function' }),
    };
  };
  
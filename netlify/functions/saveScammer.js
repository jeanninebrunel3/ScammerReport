// netlify/functions/saveScammer.js

exports.handler = async function(event, context) {
  try {
    // Ensure the incoming request is a POST request
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ message: 'Only POST requests are allowed' })
      };
    }

    // Parse the incoming data (assuming it's JSON)
    const { name, phone, fb, rib } = JSON.parse(event.body);

    // Validate required fields
    if (!name) {
      return {
        statusCode: 400, // Bad Request
        body: JSON.stringify({ message: 'Name is required' })
      };
    }

    // Simulate saving the scammer data (you can replace this with actual database logic)
    console.log('Saving scammer data:', { name, phone, fb, rib });

    // Respond with a success message
    return {
      statusCode: 200, // OK
      body: JSON.stringify({ message: 'Scammer saved successfully!' })
    };
  } catch (error) {
    console.error('Error in saveScammer function:', error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ message: 'Failed to save scammer.' })
    };
  }
};

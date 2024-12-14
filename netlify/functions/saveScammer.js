// netlify/functions/saveScammer.js

exports.handler = async function(event, context) {
  try {
    // Check if the incoming request is a POST request
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405, // Method Not Allowed
        body: JSON.stringify({ message: 'Only POST requests are allowed' })
      };
    }

    // Parse the incoming data (expecting JSON)
    const { name, phone, fb, rib } = JSON.parse(event.body);

    // Validate required fields
    if (!name) {
      return {
        statusCode: 400, // Bad Request
        body: JSON.stringify({ message: 'Name is required' })
      };
    }

    // Simulate saving the data (you can integrate a real database here)
    console.log('Saving scammer data:', { name, phone, fb, rib });

    // Respond with a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Scammer saved successfully!' })
    };
  } catch (error) {
    console.error('Error in saveScammer function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to save scammer.' })
    };
  }
};

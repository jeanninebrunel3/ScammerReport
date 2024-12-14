// netlify/functions/saveTrusted.js

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const { name, phone, fb, rib } = JSON.parse(event.body);

    // Perform any necessary validation
    if (!name) {
      return {
        statusCode: 400, // Bad Request
        body: JSON.stringify({ message: 'Name is required' })
      };
    }

    // You can add the logic to save the data to a database or perform other actions here.
    // For now, let's assume the data is being saved successfully.
    
    console.log("Trusted person data:", { name, phone, fb, rib });

    return {
      statusCode: 200, // Success
      body: JSON.stringify({ message: 'Trusted person added successfully!' })
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

// netlify/functions/search.js

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Get the data sent from the frontend (search parameters)
    const { name, phone, fb, rib } = JSON.parse(event.body);
    
    // Simulated database query for demonstration (replace this with your real data source)
    const database = [
      {
        name: 'John Doe',
        phone: '123-456-7890',
        fb: 'https://facebook.com/johndoe',
        rib: '123456789'
      },
      {
        name: 'Jane Smith',
        phone: '987-654-3210',
        fb: 'https://facebook.com/janesmith',
        rib: '987654321'
      }
    ];

    // Filter results based on search criteria
    const results = database.filter(item => {
      return (
        (name ? item.name.toLowerCase().includes(name.toLowerCase()) : true) ||
        (phone ? item.phone.includes(phone) : true) ||
        (fb ? item.fb.includes(fb) : true) ||
        (rib ? item.rib.includes(rib) : true)
      );
    });

    return {
      statusCode: 200,
      body: JSON.stringify(results) // Return the search results
    };
  } catch (error) {
    console.error('Error processing search:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing search request' })
    };
  }
};

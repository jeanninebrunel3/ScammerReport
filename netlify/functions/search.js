// netlify/functions/search.js
exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        // Parse incoming JSON data
        const { name, phone, fb, rib } = JSON.parse(event.body);

        // Simulate a database or mock data (replace with real database queries)
        const results = [
            {
                name: 'John Doe',
                phone: '123-456-7890',
                fb: 'https://facebook.com/johndoe',
                rib: '123456789',
            },
            {
                name: 'Jane Smith',
                phone: '987-654-3210',
                fb: 'https://facebook.com/janesmith',
                rib: '987654321',
            },
            {
                name: 'Samuel Green',
                phone: '555-123-4567',
                fb: 'https://facebook.com/samuelgreen',
                rib: '555555555',
            },
            // Add more mock data here as needed
        ];

        // Filter results based on the search criteria
        const filteredResults = results.filter(item => {
            return (
                (name && item.name.toLowerCase().includes(name.toLowerCase())) ||
                (phone && item.phone.includes(phone)) ||
                (fb && item.fb.toLowerCase().includes(fb.toLowerCase())) ||
                (rib && item.rib.includes(rib))
            );
        });

        // Return filtered results as JSON response
        return {
            statusCode: 200,
            body: JSON.stringify(filteredResults),
        };
    } catch (error) {
        console.error('Error processing search:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing search request' }),
        };
    }
};

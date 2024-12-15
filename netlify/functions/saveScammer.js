// netlify/functions/saveScammer.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        // Parse the incoming request body
        const { name, phone, fb, rib } = JSON.parse(event.body);

        // Example of saving the scammer data to a JSON file (adjust according to your setup)
        const filePath = path.resolve(__dirname, 'scammers.json');
        
        // Read the current scammers data
        let scammersData = [];
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath);
            scammersData = JSON.parse(rawData);
        }

        // Add the new scammer to the list
        scammersData.push({ name, phone, fb, rib });

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(scammersData, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Scammer added successfully!' }),
        };
    } catch (error) {
        console.error('Error saving scammer:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving scammer' }),
        };
    }
};

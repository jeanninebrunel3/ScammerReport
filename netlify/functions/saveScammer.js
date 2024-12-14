// netlify/functions/saveScammer.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { name, phone, fb, rib } = JSON.parse(event.body);

        // Path to your local data file (in this case, a JSON file)
        const filePath = path.join(__dirname, '../data/scammers.json');
        
        // Read the existing data from the file
        let scammersData = [];
        try {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            scammersData = JSON.parse(fileData);
        } catch (error) {
            // If the file doesn't exist, start with an empty array
            scammersData = [];
        }

        // Push the new scammer data
        scammersData.push({ name, phone, fb, rib });

        // Save the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(scammersData, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Scammer saved successfully!' }),
        };
    } catch (error) {
        console.error('Error saving scammer:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving scammer' }),
        };
    }
};

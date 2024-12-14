const fs = require('fs');
const path = require('path');

// Netlify function to save scammer data
exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
    }

    try {
        const { name, phone, fb, rib } = JSON.parse(event.body);
        const dataFilePath = path.join(__dirname, '../../data/scammers.json');

        // Read existing data from file
        let scammersData = [];
        if (fs.existsSync(dataFilePath)) {
            const fileContent = fs.readFileSync(dataFilePath);
            scammersData = JSON.parse(fileContent);
        }

        // Add new scammer
        const newScammer = { name, phone, fb, rib };
        scammersData.push(newScammer);

        // Write updated data to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(scammersData, null, 2));

        return { statusCode: 200, body: JSON.stringify({ message: 'Scammer saved successfully!' }) };
    } catch (error) {
        console.error('Error saving scammer:', error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed to save scammer' }) };
    }
};

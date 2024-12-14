const fs = require('fs');
const path = require('path');

// Netlify function to save trusted person data
exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
    }

    try {
        const { name, phone, fb, rib } = JSON.parse(event.body);
        const dataFilePath = path.join(__dirname, '../../data/trusted.json');

        // Read existing data from file
        let trustedData = [];
        if (fs.existsSync(dataFilePath)) {
            const fileContent = fs.readFileSync(dataFilePath);
            trustedData = JSON.parse(fileContent);
        }

        // Add new trusted person
        const newTrusted = { name, phone, fb, rib };
        trustedData.push(newTrusted);

        // Write updated data to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(trustedData, null, 2));

        return { statusCode: 200, body: JSON.stringify({ message: 'Trusted person saved successfully!' }) };
    } catch (error) {
        console.error('Error saving trusted person:', error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Failed to save trusted person' }) };
    }
};

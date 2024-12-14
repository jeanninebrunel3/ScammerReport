// /functions/saveScammer.js

const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { name, phone, fb, rib } = JSON.parse(event.body);

    const filePath = path.resolve(__dirname, '../data/scammers.json');
    let scammers = [];

    // Read existing scammers from file if it exists
    if (fs.existsSync(filePath)) {
        scammers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    // Add the new scammer entry
    scammers.push({ name, phone, fb, rib, type: 'scammer' });

    // Save the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(scammers, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Scammer saved successfully!' }),
    };
};

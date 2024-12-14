// /functions/saveTrusted.js

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

    const filePath = path.resolve(__dirname, '../data/trusted.json');
    let trustedPeople = [];

    // Read existing trusted persons from file if it exists
    if (fs.existsSync(filePath)) {
        trustedPeople = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    // Add the new trusted person entry
    trustedPeople.push({ name, phone, fb, rib, type: 'trusted' });

    // Save the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(trustedPeople, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Trusted person saved successfully!' }),
    };
};

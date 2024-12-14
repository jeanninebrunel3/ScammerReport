const fs = require('fs');
const path = require('path');

// Netlify function to search for scammers/trusted persons
exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
    }

    try {
        const { name, phone, fb, rib } = JSON.parse(event.body);
        const scammersDataPath = path.join(__dirname, '../../data/scammers.json');
        const trustedDataPath = path.join(__dirname, '../../data/trusted.json');

        // Read the data files
        let scammersData = [];
        let trustedData = [];

        if (fs.existsSync(scammersDataPath)) {
            const fileContent = fs.readFileSync(scammersDataPath);
            scammersData = JSON.parse(fileContent);
        }

        if (fs.existsSync(trustedDataPath)) {
            const fileContent = fs.readFileSync(trustedDataPath);
            trustedData = JSON.parse(fileContent);
        }

        // Filter the data based on search criteria
        const allData = [...scammersData, ...trustedData];
        const filteredResults = allData.filter(item => {
            return (
                (name && item.name.includes(name)) ||
                (phone && item.phone && item.phone.includes(phone)) ||
                (fb && item.fb && item.fb.includes(fb)) ||
                (rib && item.rib && item.rib.includes(rib))
            );
        });

        return {
            statusCode: 200,
            body: JSON.stringify(filteredResults),
        };
    } catch (error) {
        console.error('Error processing search:', error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Error processing search request' }) };
    }
};

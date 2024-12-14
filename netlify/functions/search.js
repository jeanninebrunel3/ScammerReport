// netlify/functions/search.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { name, phone, fb, rib } = JSON.parse(event.body);

        // Path to the scammers and trusted persons data files
        const scammersFilePath = path.join(__dirname, '../data/scammers.json');
        const trustedFilePath = path.join(__dirname, '../data/trusted.json');

        // Read the scammers data
        let scammersData = [];
        try {
            const fileData = fs.readFileSync(scammersFilePath, 'utf-8');
            scammersData = JSON.parse(fileData);
        } catch (error) {
            scammersData = [];
        }

        // Read the trusted data
        let trustedData = [];
        try {
            const fileData = fs.readFileSync(trustedFilePath, 'utf-8');
            trustedData = JSON.parse(fileData);
        } catch (error) {
            trustedData = [];
        }

        // Filter scammers data based on the search criteria
        const filteredScammers = scammersData.filter(item => {
            return (
                (name && item.name.toLowerCase().includes(name.toLowerCase())) ||
                (phone && item.phone.includes(phone)) ||
                (fb && item.fb.toLowerCase().includes(fb.toLowerCase())) ||
                (rib && item.rib.includes(rib))
            );
        });

        // Filter trusted data based on the search criteria
        const filteredTrusted = trustedData.filter(item => {
            return (
                (name && item.name.toLowerCase().includes(name.toLowerCase())) ||
                (phone && item.phone.includes(phone)) ||
                (fb && item.fb.toLowerCase().includes(fb.toLowerCase())) ||
                (rib && item.rib.includes(rib))
            );
        });

        // Combine both filtered scammers and trusted data
        const results = [...filteredScammers, ...filteredTrusted];

        // Return results
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } catch (error) {
        console.error('Error processing search:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing search request' }),
        };
    }
};

const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeGardenCenter() {
    try {
        const response = await axios.get('https://www.homedepot.com/b/Outdoors-Garden-Center/N-5yc1vZbx6k');
        const html = response.data;
        const $ = cheerio.load(html);

        // Example: Extract product names and prices
        $('.product-pod').each((index, element) => {
            const productName = $(element).find('.product-pod__title').text().trim();
            const productPrice = $(element).find('.price__dollars').text().trim();
            console.log(`Product: ${productName}, Price: ${productPrice}`);
        });
    } catch (error) {
        console.error(`Error fetching the garden center page: ${error}`);
    }
}

module.exports.scrape = scrapeGardenCenter;

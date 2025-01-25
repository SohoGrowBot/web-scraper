const axios = require('axios');
const cheerio = require('cheerio');

const aceHardwareUrl = 'https://www.acehardware.com/departments/lawn-and-garden/gardening/soils';

async function scrapeAceHardware() {
    try {
        const response = await axios.get(aceHardwareUrl);
        const $ = cheerio.load(response.data);
        
        const products = [];

        $('.product').each((index, element) => {
            const name = $(element).find('.product-name').text().trim();
            const price = $(element).find('.product-price').text().trim();
            const link = $(element).find('a').attr('href');
            products.push({ name, price, link });
        });

        console.log('Ace Hardware Products:', products);
    } catch (error) {
        console.error('Error scraping Ace Hardware:', error);
    }
}

scrapeAceHardware();

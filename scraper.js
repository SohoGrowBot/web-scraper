const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Example: Log the title of the page
        const pageTitle = $('title').text();
        console.log(`Page Title: ${pageTitle}`);
    } catch (error) {
        console.error(`Error fetching the URL: ${error}`);
    }
}

// Example usage: Scrape the Home Depot homepage
scrapeWebsite('https://www.homedepot.com/');

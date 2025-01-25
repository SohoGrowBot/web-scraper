const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeLowes() {
    try {
        let currentPage = 1;
        let lastPage = false;

        while (!lastPage) {
            const response = await axios.get(`https://www.lowes.com/pl/Perennials-Plants-bulbs-seeds-Lawn-garden/4294607941?offset=${(currentPage - 1) * 24}`);
            const html = response.data;
            const $ = cheerio.load(html);

            // Extract product information
            $('.product-wrapper').each((index, element) => {
                const productName = $(element).find('.product-title').text().trim();
                const productPrice = $(element).find('.price').text().trim();
                const productLink = $(element).find('.product-title a').attr('href');

                // Log product name, price, and link
                console.log(`Product: ${productName}, Price: ${productPrice}, Link: https://www.lowes.com${productLink}`);

                // Additional details can be extracted by making a request to the product page
                // For example:
                // axios.get(`https://www.lowes.com${productLink}`).then(productResponse => {
                //     const productHtml = productResponse.data;
                //     const productPage = cheerio.load(productHtml);
                //     const bloomColorFamily = productPage('.specifications__value:contains("Bloom Color Family")').next().text().trim();
                //     const matureHeight = productPage('.specifications__value:contains("Mature Height")').next().text().trim();
                //     const matureWidth = productPage('.specifications__value:contains("Mature Width")').next().text().trim();
                //     // Log additional attributes
                //     console.log(`Bloom Color Family: ${bloomColorFamily}, Mature Height: ${matureHeight}, Mature Width: ${matureWidth}`);
                // });

            });

            // Check for next page
            const nextPageLink = $('.pagination__button--next');
            if (nextPageLink.length > 0) {
                currentPage++;
            } else {
                lastPage = true;
            }
        }
    } catch (error) {
        console.error(`Error fetching the Lowe's page: ${error}`);
    }
}

module.exports.scrape = scrapeLowes;

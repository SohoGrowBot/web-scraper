const readline = require('readline');
const gardenCenterScraper = require('./gardenCenterScraper');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Select a scraper to run:');
console.log('1. Garden Center');

rl.question('Enter the number of the scraper: ', (answer) => {
    switch (answer) {
        case '1':
            gardenCenterScraper.scrape();
            break;
        default:
            console.log('Invalid selection');
    }
    rl.close();
});

const express = require("express");
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', async (req, res) => {
    const text = await getTodayEvents();
    res.send(text);
});

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

async function getTodayEvents() {

    const todayUrl = "https://www.checkiday.com/";
    try {
        // Fetch HTML content of the webpage
        const response = await axios.get(todayUrl);
        // Load HTML content into Cheerio
        const $ = cheerio.load(response.data);
        
        const Holiday = $('.holiday');

        const events = []; 

        Holiday.each((index, holiday) => {
            const $holiday = $(holiday);
            const holidayTitle = $holiday.find('h2').text();
            const holidayDescription = $holiday.find('.mdl-card__supporting-text').text();

            // const hello = holidayDescription.split('Observed');
            
            
            let collection = holidayDescription.split('Observed');
            collection[1] = " Observed" + holidayDescription.split('Observed')[1];

            const desc = collection[0] + '.' + collection[1]
               
            const event = {
                holidayTitle,
                holidayDescription: desc.trim(),
            }

            events.push(event);
        })

        const filteredEvents = events.slice(0, 12);

        // console.log(filteredEvents[1]['holidayDescription'])
        
        for(let i = 0; i < filteredEvents.length; i++){
            
            if(filteredEvents[i]['holidayDescription'][0] == '.'){
                console.log(filteredEvents[i]['holidayDescription'][0])
                const strippedText = JSON.stringify(filteredEvents[i]['holidayDescription']);
                filteredEvents[i]['holidayDescription'] = strippedText.slice(2,-1).trim();
            } else {

                console.log('nah')
            }
        }

        return filteredEvents;

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return 'Error fetching or parsing data';
    }
  }
  

module.exports = router;
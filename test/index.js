var scrape = require('../index');

scrape('http://youtube.com')
.then(function(links){
    console.log('content scraped')
    console.log(links);
})
.catch(function(err){
    console.log(err);
})
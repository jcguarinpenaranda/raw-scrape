# raw-scrape

*raw-scrape* is an npm module for scraping all the links of a given webpage.

It gives you the url, description, favicon and title of each link found in the given webpage.

# How to use it?

```javascript
var scrape = require('raw-scrape');

scrape('http://youtube.com')
.then(function(links){
    console.log('content scraped')
    console.log(links);

    /*
        [{ title: 'enchufetv - YouTube',
    description: 'Enjoy the videos and music you love, upload original content, and share it all with friends
    , family, and the world on YouTube.',
        icon: 'http://s.ytimg.com/yts/img/favicon_32-vfl8NGn4k.png',
        url: 'http://youtube.com/user/enchufetv' },
    { title: '  \n1:05 - YouTube',
        description: 'Enjoy the videos and music you love, upload original content, and share it all with friends ....
    */
})
.catch(function(err){
    console.log(err);
})
```

## License

MIT.

## Author

Juan Camilo Guarín Peñaranda
Colombia
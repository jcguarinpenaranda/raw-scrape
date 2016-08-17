var jsdom = require('jsdom');
var Q = require('q');

//The webpage to scrape
module.exports = function(webpage){
    var d = Q.defer();
    var links = [];
    
    jsdom.env({
        url: webpage,

        //includes jquery for easy dom manipulation
        scripts: ["http://code.jquery.com/jquery.js"],
        
        //once data has been retrieved
        done: function(err, window){

            if(err){
                //reject the promise
                d.reject(err);
            }

            var $ = window.$;

            //on dom ready
            $(function(){


                var title = $('title').text();

                //scrape all the anchors (links)
                $('a').each(function(){
                    var href = getHref($(this).attr('href'), webpage)
                    var articleTitle = $(this).text();

                    if(articleTitle){
                        finalTitle = articleTitle;
                        
                        if(title){
                            finalTitle += " - "+title;
                        }

                        var description = $('meta[name=description]').attr("content");

                        var icon = getHref($("link[rel='icon']").attr('href'), webpage);

                        // add the current link to the list
                        links.push({
                            title: finalTitle,
                            description: description,
                            icon: icon,
                            url: href
                        });

                    }

                })

                //resolve the promise
                d.resolve(links);
            })
            
        }
    })

    return d.promise;
}


//gets the normalized href
function getHref(currentUrl, baseUrl){
    if(!currentUrl){
        return "";
    }

    if(currentUrl.startsWith('//')){
        return "http:"+currentUrl;
    }

    if(currentUrl[0] === '/'){
        return baseUrl + currentUrl;
    }

    if(currentUrl[0] !== 'h'){
        return baseUrl + '/'+currentUrl;
    }


    // http://, https://
    return currentUrl;
}
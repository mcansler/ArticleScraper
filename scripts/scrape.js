var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
  
  request("https://www.awn.com/", function (err, res, body) {
        
        var $ = cheerio.load(body);

        var articles = [];

        $("article.node-article").each(function(i, element) {
            var head = $(element).find("h2.node-title").text().trim();
            var sum = $(element).find("p").text().trim();
            var url = $(element).find("span.title-with-tag").children("a").attr("href");

            if(head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                    url: url
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;
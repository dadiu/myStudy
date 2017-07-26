var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var url = 'https://cnodejs.org/';
var app = express();

app.get('/', function(req,res,next){

    superagent.get(url)
        .end(function(err, sres){

            if(err){
                return next(err);
            }


            var $ = cheerio.load(sres.text);
            var items = [];
            $("#topic_list .cell").each(function(){
                var $element = $(this);
                items.push({
                    "title" : $element.find(".topic_title").text(),
                    "href" : $element.find(".topic_title").prop("href"),
                    "author" : $element.find(".user_avatar").find("img").prop("title")
                })
            })

            
            res.send(items);

        })
})

app.listen(3000, function(req,res){

    console.log('app is running at port 3000');
})
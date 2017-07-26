

var cheerio = require('cheerio');
var superagent = require('superagent');
var eventproxy = require('eventproxy');

var url = require('url');

var codeUrl = 'https://cnodejs.org/';

/**
 * cnodjs.org 网站有并发连接数的限制，所有当请求发送太快的时候会导致返回为空或报错，建议一次抓取3个主题即可
 */

superagent.get(codeUrl)
    .end(function (err, res) {

        if (err) {
            console.log(err);
        }


        var topicUrls = [];
        var $ = cheerio.load(res.text);

        $('#topic_list .topic_title').each(function (idx, element) {

            var $element = $(element);

            // url.resolve()  自动推算出完整的url
            var href = url.resolve(codeUrl, $element.prop('href'))
            topicUrls.push(href);
        });

        var ep = new eventproxy();

        ep.after('topic_html', topicUrls.length, function (topics) {
            // console.log(topics);

            topics = topics.map(function (topicPair) {

                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];

                var $ = cheerio.load(topicHtml);
                var author1Data = $('.reply_area').eq(0);

                return ({
                    'title': $('h1').text().trim(),
                    'href': topicUrl,
                    'author1': author1Data.find('.reply_author').text().trim(),
                    'commont1': author1Data.find('.markdown-text').text().trim(),
                    'score1': author1Data.find('.up-count').text().trim()
                })
            });

            console.log('final:');
            console.log(JSON.stringify(topics));
        })

        topicUrls.forEach(function (topUrl) {

            superagent.get(topUrl)
                .end(function (err, res) {

                    // if (err) {
                    //     console.log(err);
                    // }

                    console.log('fetch: ' + topUrl + ' successful');
                    ep.emit('topic_html', [topUrl, res.text]);
                })
        })


    })
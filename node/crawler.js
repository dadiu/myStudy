var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filterChapters(html){

	var $ = cheerio.load(html);

	var chapters = $('.chapter');

	// [
	// 	{
	// 		chapterTitle : '',
	// 		videos : [
	// 			title : '',
	// 			id : ''
	// 		]
	// 	}
	// ]

	var courseData = [];
	
	chapters.each(function(){

		var chapter = $(this);
		var chapterTitle = chapter.find('strong').contents().filter(function() { return this.nodeType === 3; }).text().trim();
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle : chapterTitle,
			videos : []
		};

		videos.each(function(){
			var video = $(this).find('.J-media-item');
			var videoTitle = video.text().replace(/\s+/g,' ').trim();
			var id = video.attr('href').split('video/')[1];

			chapterData.videos.push({
				title : videoTitle,
				id : id
			});
		});
		courseData.push(chapterData);
	})

	return courseData;
};

function printCouseInfo(courseData){

	//console.log(courseData);
	// return false;
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle);
		//console.log(item.videos + '\n');
		item.videos.forEach(function(video){
			console.log(' [' + video.id + ']' + video.title.trim() + '\n');
		})
	})
}

http.get(url, function(res){

	var html = '';

	res.on('data', function(data){
		html += data;
	});

	res.on('end', function(){
		var courseData = filterChapters(html);
		printCouseInfo(courseData);

	});
}).on('error', function(){
	console.log('wrong');
})

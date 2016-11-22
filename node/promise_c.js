
var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
// var url = 'http://www.imooc.com/learn/348';
var videoIds = [75,134,197,259,348,637,728];

function filterChapters(html){

	var $ = cheerio.load(html);

	var chapters = $('.chapter');
	var title = $('#main').find('h2').text();
	var number = $($('#main .js-learn-num')[0]).text();	//因为number是异步加载，所以获取不到

	// console.log(title);
	// console.log(number + '// number');
	// {
	// 	title : title,		//标题
	// 	number : number,	//学习过的人数
	// 	videos : [{
	// 		chapterTitle : '',
	// 		videos : [
	// 			title : '',
	// 			id : ''
	// 		]
	// 	}]
	// }

	var courseData = {
		title : title,
		number : number,
		videos : []
	};
	
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
		courseData.videos.push(chapterData);
	})

	return courseData;
};

// 打印
function printCouseInfo(coursesData){

	// console.log(coursesData);
	// return false;
	coursesData.forEach(function(courseData){
		console.log(courseData.number + ' 人学过' + courseData.title + '\n');
	});

	coursesData.forEach(function(courseData){
		console.log('###' + courseData.title + '\n');

		courseData.videos.forEach(function(item){
			var chapterTitle = item.chapterTitle;
			console.log(chapterTitle + '\n');

			//console.log(item.videos);
			item.videos.forEach(function(video){
				console.log(' [' + video.id + ']' + video.title.trim() + '\n');
			})
		})

		
	})
}

//单页面爬虫返回结果
function getPageAsfnc(url){
	return new Promise(function(resolve, reject){
		console.log('正在爬取: ' + url);

		http.get(url, function(res){

			var html = '';

			res.on('data', function(data){
				html += data;
			});

			res.on('end', function(){
				resolve(html);
				// var courseData = filterChapters(html);
				// printCouseInfo(courseData);
			});
		}).on('error', function(e){
			reject(e);
			console.log('wrong');
		})


	})
};


var fetchCourseArray = [];

videoIds.forEach(function(id){
	// 把遍历的结果返回给单页面爬虫方法 - getPageAsfnc
	fetchCourseArray.push(getPageAsfnc(baseUrl + id));
});


// 获取多页面的数据进行处理
Promise
	.all(fetchCourseArray)
	.then(function(pages){
		// 获取多页面的数据进行处理

		var courseData = [];
		pages.forEach(function(html){
			var courses = filterChapters(html);
			courseData.push(courses);
		});

		courseData.sort(function(a, b){
			return a.number < b.number;
		});

		printCouseInfo(courseData);
	})



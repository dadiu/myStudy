var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages'); // 默认打开页
app.set('view engine', 'jade'); // 默认模板引擎
app.use(express.static(path.join(__dirname, 'bower_components'))); //默认js和css路径
app.listen(port); //监听端口

console.log("open : 192.168.110.182:" + port);


//index page
app.get('/', function(req, res) {
	res.render('index', {
		title: "首页",
		movies :[{
			title : '鲨滩',
			_id : 1,
			poster : 'http://pic7.qiyipic.com/image/20161123/af/7b/v_111245484_m_601_m1_180_236.jpg'
		},{
			title : '终极硬汉',
			_id : 2,
			poster : 'http://pic7.qiyipic.com/image/20160921/21/bc/v_111011131_m_601_m1_180_236.jpg'
		},{
			title : '亚洲之爱',
			_id : 3,
			poster : 'http://pic1.qiyipic.com/image/20161116/1d/be/v_111270033_m_601_m2_180_236.jpg'
		},{
			title : '赌神归来2之黄金赌城',
			_id : 4,
			poster : 'http://pic6.qiyipic.com/image/20161122/13/12/v_111328047_m_601_m2_180_236.jpg'
		}]
	})
})

//detail page
app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: "详情页",
		movie : {
			title : '鲨滩',
			doctor : '佐米·希尔拉',
			country : '美国',
			year : '2016',
			poster : 'http://pic7.qiyipic.com/image/20161123/af/7b/v_111245484_m_601_m1_180_236.jpg',
			language : '英语',
			flash : 'http://www.iqiyi.com/common/flashplayer/20161122/1823f98c2359.swf',
			summary : '为了纪念早逝的母亲，南希（布蕾克·莱弗利 Blake Lively 饰）来到了那片对于母亲来说有着别样意义...'
		}
	})
})

//admin page
app.get('/admin', function(req, res) {
	res.render('admin', {
		title: "后台录入页",
		movie : {
			title : '',
			doctor : '',
			country : '',
			year : '',
			poster : '',
			language : '',
			flash : '',
			summary : ''
		}
	})
})

//list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: "后台录入页",
		movies : [{
			title : '鲨滩',
			_id : 1,
			doctor : '佐米·希尔拉',
			country : '美国',
			year : '20161124',
			poster : 'http://pic7.qiyipic.com/image/20161123/af/7b/v_111245484_m_601_m1_180_236.jpg',
			language : '英语',
			flash : 'http://www.iqiyi.com/common/flashplayer/20161122/1823f98c2359.swf',
			summary : '为了纪念早逝的母亲，南希（布蕾克·莱弗利 Blake Lively 饰）来到了那片对于母亲来说有着别样意义...'
		}]
	})
})
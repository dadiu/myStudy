/**
 * Buffer
 * poolSize : 8192 						内存载体的容量
 * isBuffer : [Function : isBuffer]		静态方法，判断对象是否是Buffer类型对象
 * compare : [Function : compare]		用来判断两个Buffer对象的相对位置，按字符串排序等
 * isEncoding : [Function]				判断node.js是否支持某种编码
 * concat : [Function]					用于几个Buffer对象的链接和合并成新的对象
 * byteLength : [Function]				用来获得指定编码下字符串所占的字节数
 **/


// 实例
var fs = require('fs');
fs.readFile('logo.png', function(err, origin_buffer){
	console.log(Buffer.isBuffer(origin_buffer));

	fs.writeFile('logo_buffer.png', origin_buffer, function(err){
		if(err){
			console.log(err);
		};
	});

	var base64Img = origin_buffer.toString('base64');
	console.log(base64Img);

	var decodedImage = new Buffer(base64Img, 'base64');
	console.log(Buffer.compare(origin_buffer, decodedImage));

	fs.writeFile('logo_decoded.png', decodedImage, function(err){
		if(err) {
			console.log(err);
		}
	})
})
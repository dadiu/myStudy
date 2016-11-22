var fs = require('fs');

var readStream = fs.createReadStream('../buffer/logo.png');
var writeStream = fs.createWriteStream('stream_copy.png');

readStream.on('data', function(chunk){
	if(writeStream.write(chunk) === false){
		//如果还在暂存，则暂停
		console.log('still cached')
		readStream.pause();
	}
});

readStream.on('end', function(){
	writeStream.end();
});

//数据消费完毕
writeStream.on('drain', function(){
	console.log('data drains');

	readStream.resume();	
})
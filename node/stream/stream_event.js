var fs = require('fs');

var readStream = fs.createReadStream('stream_copy_logo.js');

var n = 0;

readStream
	.on('data', function(chunk){	// 开始传输数据
		n++;
		console.log('data emits');
		console.log(Buffer.isBuffer(chunk));
		//console.log(chunk.toString('utf8'));

		// 暂停
		readStream.pause();
		console.log('data pause');

		// 设置定时器 模拟请求
		setTimeout(function(){
			console.log('data pause end');

			// 重启
			readStream.resume();
		}, 3000);
	})
	.on('readable', function(){		// 可读
		console.log('data readable')
	})
	.on('end', function(){			// 数据传递完成后触发，同时触发目标
		console.log(n)
		console.log('data ends')
	})
	.on('close', function(){		// 整个完结后，触发close事件
		console.log('data close')
	})
	.on('error', function(e){		// 错误时输出
		console.log('data read error ' + e)
	})
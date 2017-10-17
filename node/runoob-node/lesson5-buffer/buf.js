/**
 * http://www.runoob.com/nodejs/nodejs-buffer.html
 * Node.js Buffer(缓冲区)
 */
var buf = new Buffer(26);
for(var  i = 0; i < 26; i++){
    buf[i] = i + 97;
}


// 返回 字符串。
// console.log(buf.toString());

// console.log(buf.toString('utf-8', 1, 5));


// 返回 JSON 对象。
// console.log(buf.toJSON());


// 缓冲区合并
// Buffer.concat(list[, totalLength])
console.log("------------ concat ---------------");

var buf1 = new Buffer('菜鸟教程 ');
var buf2 = new Buffer('www.runoob.com');
var buf3 = Buffer.concat([buf1, buf2]);
console.log(buf3.toString());


// 缓冲区比较
// buf.compare(otherBuffer);
console.log("------------ compare ---------------");

var bufs1 = new Buffer('ABC');
var bufs2 = new Buffer('ABCD');
var result = bufs1.compare(bufs2);

if(result < 0){

    console.log(bufs1 + '在' + bufs2 + '之前');

} else if(result === 0){

    console.log(bufs1 + '与' + bufs2 + '相同');

} else{

    console.log(bufs1 + '在' + bufs2 + '之后');

}


// 拷贝缓冲区
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
console.log("------------ copy ---------------");

var buf_fa = new Buffer('ABC');
var buf_ch = new Buffer(3);
buf_fa.copy(buf_ch,0,0,4);
console.log(buf_ch.toString());
console.log(buf_ch.toString().length);



// 缓冲区裁剪
// buf.slice([start[, end]])


// 缓冲区长度
// buf.length;

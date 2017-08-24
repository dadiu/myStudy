const Koa = require('koa');
const os = require('os');
const path = require('path');
const koaBody = require('koa-body');
const fs = require('fs');


const app = new Koa();

const main = async (ctx) =>{

    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for( let key in files){

        const file = files[key];
        const filePtah = path.join(tmpdir, file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        filePaths.push(filePath);
    }

    ctx.body = filePaths;
}



app.use(koaBody({ multipart : true }));
app.use(main);
app.listen(3000);


// 运行  /path/to/file要更换为真实的文件路径。
// curl --form upload=@/path/to/file http://127.0.0.1:3000
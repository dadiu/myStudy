/*
 * @Author: whj 
 * @Date: 2018-08-28 11:07:20 
 * @Last Modified by: whj
 * @Last Modified time: 2018-08-28 11:07:49
 */

var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(3000);
console.log('you are listening to port 3000');
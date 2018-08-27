/*
 * @Author: whj 
 * @Date: 2018-08-27 16:59:24 
 * @Last Modified by: whj
 * @Last Modified time: 2018-08-27 17:38:07
 */

var data = [
    { item: 'get milk' },
    { item: 'walk dog' },
    { item: 'get flowers' }
]

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoose = require('mongoose');

mongoose.connect('mongodb://dadiu:dadiu2018@ds117839.mlab.com:17839/daywork');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var itemOne = Todo({ item: 'buy flower' }).save(function(err) {
    if (err) throw err;
    console.log('item saved');
})

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        res.render('todo', { todos: data });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        })
        res.json(data);
    })
}
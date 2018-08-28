/*
 * @Author: whj 
 * @Date: 2018-08-27 16:59:24 
 * @Last Modified by: whj
 * @Last Modified time: 2018-08-28 11:07:12
 */

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

mongoose.connect(
    'mongodb://dadiu:dadiu2018@ds117839.mlab.com:17839/daywork', { useNewUrlParser: true },
    function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('success')
        }
    }
);

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data })
        })
    });

    app.post('/todo', urlencodedParser, function(req, res) {

        Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        Todo.find({ item: req.params.item.replace(/-/g, ' ') }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
    })
}
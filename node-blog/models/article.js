const mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    uptime: {
        type: String,
        require: true
    },
    authorName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

let Article = module.exports = mongoose.model('Article', articleSchema);
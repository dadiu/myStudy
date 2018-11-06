const express = require('express');

const {
    check,
    validationResult
} = require('express-validator');

// let Todo = require('../models/todolist');
let User = require('../models/user');
let router = express.Router();

router.get('/new', (req, res) => {
    if (req.user) {
        res.render('todolists/new');
    } else {
        req.flash('error', '请先登录');
        res.render('user/login');
    }
})

module.exports = router;
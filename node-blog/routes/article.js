const express = require('express');

const {
    check,
    validationResult
} = require('express-validator/check');

const master = require('../config/master');

let Article = require('../models/article');
let User = require('../models/user');
let router = express.Router();



// router
router.get('/new', (req, res) => {

    if (req.user) {
        res.render('articles/new');
    } else {
        req.flash('error', '请先登录');
        res.render('user/login');
    }
})


// 新建数据
router.post('/new', [
        check('title').isLength({
            min: 1,
            max: 30
        }).withMessage('标题长度为1-30字符'),
        check('body').isLength({
            min: 1,
            max: 1000000
        }).withMessage('内容长度为1-1000000字符'),
    ],
    (req, res) => {
        // 验证表单
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            res.render('articles/new', {
                errors: errors.array()
            })
            return;
        }

        let article = new Article(req.body);

        // 登录超时
        if (!req.user) {

            req.flash('error', '登录已过期');
            res.render('user/login');
            return;
        };

        article.authorName = req.user.username;
        article.author = req.user._id;
        article.uptime = master.formatDateTime();
        // console.log(article);

        article.save((err) => {

            if (err) {
                console.log(err);
            } else {
                req.flash("success", "文章发布成功");
                res.redirect('/');
            }
        })
    })

// 请求单个数据
router.get('/:id', (req, res) => {

    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            // res.send(article);
            User.findById(article.author, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(JSON.stringify(article.body));
                    res.render('articles/show', {
                        article: article
                    })
                }
            })
        }
    })
})

// 编辑
router.get('/:id/edit', (req, res) => {

    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            // res.send(article);
            // 是否修改自己的文章
            if (req.user && req.user._id == article.author) {

                res.render('articles/edit', {
                    article: article
                });

            } else {

                req.flash('error', '请先登录');
                res.render('user/login');
            }
        }
    })

});

// 更新数据
router.post('/:id/update', [
    check('title').isLength({
        min: 1,
        max: 30
    }).withMessage('标题长度为1-30字符'),
    check('body').isLength({
        min: 1,
        max: 1000000
    }).withMessage('内容长度为1-1000000字符'),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(req.body);
        res.render('articles/edit', {
            errors: errors.array(),
            article: {
                title: req.body.title,
                author: res.local.author,
                body: req.body.body,
                _id: req.params.id
            },
            id: req.params.id,
        });
        return;
    }

    let updateData = req.body;
    updateData.uptime = master.formatDateTime();

    Article.updateOne({
        _id: req.params.id
    }, updateData, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            // res.send(article);
            req.flash("success", "文章已更新");
            res.redirect('/')
        }
    })

});

// 删除数据
router.delete('/:id', (req, res) => {
    Article.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "文章已删除");
            res.send('success');
        }
    })
})


module.exports = router;
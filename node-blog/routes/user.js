const express = require('express');
const {
    check,
    validationResult
} = require('express-validator/check');
const bcrypt = require('bcrypt');
const passport = require('passport');

let User = require('../models/user');
let router = express.Router();


// 注册 dom
router.get('/register', (req, res) => {
    res.render('user/register', {
        formData: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    });
});

// 注册 表单提交
router.post('/register', [
    check('username').isLength({
        min: 1,
        max: 20
    }).withMessage('用户名长度为1-20个字符之间')
    .isAlphanumeric().withMessage('用户名只可包含字母和数字'),

    check('email')
    .isLength({
        min: 1
    }).withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式错误'),

    check('password', '密码不能为空')
    .isLength({
        min: 6,
        max: 20
    }).withMessage('密码长度为6-20个字符之间')
    .isAlphanumeric().withMessage('密码只可包含字母和数字')
    .custom(
        (value, {
            req
        }) => {
            if (value !== req.body.passwordConfirmation) {
                throw new Error('两次输入的密码不同')
            } else {
                return value;
            }
        }
    )
], (req, res) => {

    // 表单验证
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.send(errors)
        res.render('user/register', {
            errors: errors.array(),
            formData: req.body
        })
        return;
    };

    // 是否已存在
    User.find({ "username": req.body.username }, (err, userItem) => {

        if (err) {
            console.log(err);
            return;
        };

        if (userItem.length > 0) {

            req.flash('error', '用户名已存在');
            res.render('user/register', {
                formData: req.body
            });
            return;
        };

        let user = new User(req.body);

        // 加密
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {

                if (err) {
                    console.log(err);
                    return;
                }
                user.password = hash;

                // 储存
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash('success', '注册成功');
                        res.redirect('/user/login');
                    }
                })
            });
        });
    });

});


// 登录 dom
router.get('/login', (req, res) => {
    res.render('user/login');
});


// 登录 表单提交
router.post('/login', [
    check('username').isLength({
        min: 1,
        max: 20
    }).withMessage('用户名长度为1-20个字符之间')
    .isAlphanumeric().withMessage('用户名只可包含字母和数字'),

    check('password', '密码不能为空')
    .isLength({
        min: 6,
        max: 20
    }).withMessage('密码长度为6-20个字符之间')
    .isAlphanumeric().withMessage('密码只可包含字母和数字')
], (req, res, next) => {

    // 验证表单
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('user/login', {
            errors: errors.array()
        })
        return;
    };

    passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Welcome!',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

// 注销
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', '您已退出');
    res.redirect('/user/login');
})


module.exports = router;
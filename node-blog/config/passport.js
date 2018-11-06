const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');


module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({
                username: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: '用户名不存在' });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        return done(err);
                    }
                    if (isMatch) {
                        // 正确
                        return done(null, user);
                    };
                    return done(null, false, { message: '密码错误' });
                })
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
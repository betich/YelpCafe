var express = require('express'),
    passport = require('passport'),
    User = require('../models/users'),
    router  = express.Router();

router
.get('/', (req,res) => {
    res.render("landingpage");
})

.get('/register', (req, res) => {
    res.render('register');
})

.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        User.authenticate("local")(req, res, () => {
            req.flash('success', "Welcome, " + user.username);
            req.login(user, (err) => {
                if(err) req.flash('error', err.message);
                res.redirect('/cafes');
            });
        });
    });
})

.get('/login', (req, res) => {
    res.render('login');
})

.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/login');
        } else if (!user) {
            req.flash('error', "The username or password is incorrect");
            res.redirect('/login');
        } else {
            req.login(user, (err) => {
                if(err) {
                    req.flash('error', err.message);
                    res.redirect('/login');
                }
                else {
                    req.flash('success', "Welcome, " + user.username);
                    res.redirect(req.session.returnTo || '/cafes');
                    delete req.session.returnTo;
                }
            });
        }
    })(req, res, next);
})

.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Logged out");
    res.redirect('/cafes');
});

module.exports = router;
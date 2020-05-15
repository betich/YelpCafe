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
            res.redirect('/cafes');
        });
    });
})

.get('/login', (req, res) => {
    res.render('login');
})

.post('/login', passport.authenticate('local', {
    successRedirect: '/cafes',
    failureRedirect: '/login'
}))

.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Logged out");
    res.redirect('/cafes');
});

module.exports = router;
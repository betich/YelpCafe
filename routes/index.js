var express = require('express'),
    passport = require('passport'),
    User = require('../models/users'),
    router  = express.Router();

router.get('/', (req,res) => {
    res.render("landingpage");
})

.get('/register', (req, res) => {
    res.render('register');
})

.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        }
        User.authenticate("local")(req, res, () => {
            res.redirect('/login');
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
    res.redirect('/cafes');
});

module.exports = router;
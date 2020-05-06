var express = require('express'),
    router  = express.Router(),
    Cafe    = require('../models/cafes');

router.get('/', (req,res) => {
    Cafe.find({}, (err, allCafes) => {
        if (err) throw err;
        else {
            res.render("cafes/index", {cafes: allCafes});
        }
    });
})

.post('/', checkLogin, (req,res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCafe = {name: name, img: image, description: desc, author:author};
    Cafe.create(newCafe, (err, cafe) => {
        if (err) throw err;
        else {
            console.log("NEW CAFE: Cafe " + cafe.name + " has been created by \'" + cafe.author.username + "\'.");
            res.redirect('/cafes');
        } 
    });
})

.get('/new', checkLogin, (req,res) => {
    res.render('cafes/create');
})

.get('/:id', (req,res) => {
    Cafe.findById(req.params.id).populate("comments").exec((err, foundCafe) => {
        if (err) throw err;
        else {
            res.render("cafes/show", {cafe: foundCafe});
        }
    });
});

function checkLogin(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
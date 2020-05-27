var express = require('express'),
    router  = express.Router(),
    Cafe    = require('../models/cafes'),
    auth    = require('../middleware');

router
.get('/', (req,res) => {
    Cafe.find({}).populate("comments").exec((err, allCafes) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else {
            res.render("cafes/index", {cafes: allCafes});
        }
    });
})

// Create New Cafe
.post('/', auth.checkLogin, (req,res) => {
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let price = req.body.price;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCafe = {name: name, img: image, description: desc, price: price, author:author};
    Cafe.create(newCafe, (err, cafe) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/cafes');
        }
        else {
            req.flash("Cafe " + cafe.name + " has been created by \'" + cafe.author.username + "\'");
            res.redirect('/cafes');
        } 
    });
})
.get('/new', auth.checkLogin, (req,res) => {
    res.render('cafes/create');
})

// Show
.get('/:id', (req,res) => {
    Cafe.findById(req.params.id).populate("comments").exec((err, foundCafe) => {
        if (err || !foundCafe) {
            req.flash('error', "Sorry, Your Cafe cannot be found!");
            res.redirect('back');
        }
        else {
            res.render("cafes/show", {cafe: foundCafe});
        }
    });
})

// Edit
.get('/:id/edit', auth.checkOwnership, (req, res) => {
    Cafe.findById(req.params.id, (err, foundCafe) => {
        res.render("cafes/edit", {cafe: foundCafe});
    });
})

// Update
.put('/:id', auth.checkOwnership, (req, res) => {
    Cafe.findByIdAndUpdate(req.params.id, req.body.cafe, {useFindAndModify: false}, (err, updatedCafe) => {
        if(err) res.redirect('back');
        else res.redirect('/cafes/' + req.params.id);
    });
})

// Remove
.delete('/:id', auth.checkOwnership, (req, res) => {
    Cafe.findByIdAndRemove(req.params.id, {useFindAndModify: false}, async(err) => {
        if(err) {
            let removedCafe = await Cafe.findById(req.params.id);
            await removedCafe.remove();
            res.redirect('/cafes');
        }
        else res.redirect('/cafes');
    });
});

module.exports = router;
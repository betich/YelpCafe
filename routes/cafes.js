var express = require('express'),
    router  = express.Router(),
    Cafe    = require('../models/cafes');

router.get('/', (req,res) => {
    Cafe.find({}, (err, allCafes) => {
        if (err) console.log(err);
        else {
            res.render("cafes/index", {cafes: allCafes});
        }
    });
})

// Create New Cafe
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
        if (err) console.log(err);
        else {
            console.log("NEW CAFE: Cafe " + cafe.name + " has been created by \'" + cafe.author.username + "\'.");
            res.redirect('/cafes');
        } 
    });
})
.get('/new', checkLogin, (req,res) => {
    res.render('cafes/create');
})

// Show
.get('/:id', (req,res) => {
    Cafe.findById(req.params.id).populate("comments").exec((err, foundCafe) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("cafes/show", {cafe: foundCafe});
        }
    });
})

// Edit
.get('/:id/edit', checkOwnership, (req, res) => {
    Cafe.findById(req.params.id, (err, foundCafe) => {
        res.render("cafes/edit", {cafe: foundCafe});
    });
})

// Update
.put('/:id', checkOwnership, (req, res) => {
    Cafe.findByIdAndUpdate(req.params.id, req.body.cafe, {useFindAndModify: false}, (err, updatedCafe) => {
        if(err) res.redirect('back');
        else res.redirect('/cafes/' + req.params.id);
    });
})

// Remove
.delete('/:id', checkOwnership, (req, res) => {
    Cafe.findByIdAndRemove(req.params.id, {useFindAndModify: false}, async(err) => {
        if(err) {
            let removedCafe = await Cafe.findById(req.params.id);
            await removedCafe.remove();
            res.redirect('/cafes');
        }
        else res.redirect('/cafes');
    });
});

function checkLogin(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}
function checkOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        // Is the user authorized?
        Cafe.findById(req.params.id, (err, foundCafe) => {
            if(foundCafe.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect('back');
            }
        });
    } else {
        res.redirect('back');
    }
}

module.exports = router;
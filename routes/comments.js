var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Cafe    = require('../models/cafes'),
    Comment = require('../models/comments');

router.get('/new', checkLogin, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) throw err;
        else {
            res.render("comments/create", {cafe: cafe});
        }
    })
})

.post('/', checkLogin, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) {
            console.log(err);
            res.redirect('/cafes');
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) throw err;
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save
                    comment.save();
                    cafe.comments.push(comment);
                    cafe.save();
                    res.redirect('/cafes/' + cafe._id);
                }
            })
        }
    })
});

function checkLogin(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Cafe    = require('../models/cafes'),
    Comment = require('../models/comments'),
    auth    = require('../middleware');

// Create
router.get('/new', auth.checkLogin, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) console.log(err);
        else {
            res.render("comments/create", {cafe: cafe});
        }
    })
})

.post('/', auth.checkLogin, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) {
            console.log(err);
            res.redirect('/cafes');
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) console.log(err);
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
})

// Edit
.get('/:comment_id/edit', auth.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        if(err) res.redirect('back');
        else {
            let cafe = Cafe.findById(req.params.id);
            res.render('comments/edit', {cafe: cafe, comment: comment});
        }
    });
})

//Update
.put('/:comment_id', auth.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, {useFindAndModify: false}, (err, updatedComment) => {
        if(err) res.redirect('back');
        else res.redirect('/cafes/' + req.params.id);
    });
})

// Remove
.delete('/:comment_id', auth.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, {useFindAndModify: false}, (err) => {
        if(err) res.redirect('back');
        else res.redirect('/cafes/' + req.params.id);
    });
});

module.exports = router;
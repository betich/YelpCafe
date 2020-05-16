var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Cafe    = require('../models/cafes'),
    Comment = require('../models/comments'),
    auth    = require('../middleware');

// Create 
router
.get('/new', auth.checkLogin, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else {
            res.render("comments/create", {cafe: cafe});
        }
    })
})

.post('/', auth.checkLogin, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('back');
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save
                    comment.save();
                    cafe.comments.push(comment);
                    cafe.save();
                    req.flash('success', "Your comment has been added successfully")
                    res.redirect('/cafes/' + cafe._id);
                }
            })
        }
    })
})

// Edit
.get('/:comment_id/edit', auth.checkCommentOwnership, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err || cafe == undefined) {
            req.flash('error', "Cafe not found");
            res.redirect('back');
        }
        else {
            Comment.findById(req.params.comment_id, (err, comment) => {
                if(err || !comment) {
                    req.flash('error', "Comment not found");
                    res.redirect('back');
                } 
                else {
                    res.render('comments/edit', {cafe: cafe, comment: comment});
                }
            });
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
        else {
            req.flash('success', "Comment deleted");
            res.redirect('/cafes/' + req.params.id);
        }
    });
});

module.exports = router;
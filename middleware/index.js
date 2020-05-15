var Cafe    = require('../models/cafes'),
    Comment = require('../models/comments');

var middleware = {
    checkOwnership: (req, res, next) => {
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
    },
    checkCommentOwnership: (req, res, next) => {
        if(req.isAuthenticated()) {
            // Is the user authorized?
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if(err) res.redirect('back');
                else {
                    if(foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect('back');
                    }
                }
            });
        } else {
            res.redirect('back');
        }
    },
    checkLogin: (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    }
};

module.exports = middleware;
var app         = require('express')(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Cafe  = require('./models/cafes'),
    Comment = require('./models/comments'),
    seedDB = require('./seeds');

mongoose.connect("mongodb://localhost:27017/yelpcafe", {useUnifiedTopology: true, useNewUrlParser: true,});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

seedDB();

app.get('/', (req,res) => {
    res.render("landingpage");
})
.get('/cafes', (req,res) => {
    Cafe.find({}, (err, allCafes) => {
        if (err) throw err;
        else {
            res.render("cafes/index", {cafes: allCafes});
        }
    });
})
.post('/cafes', (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCafe = {name: name, img: image, description: desc};
    Cafe.create(newCafe, (err, cafe) => {
        if (err) throw err;
        else {
            console.log("NEW CAFE: Cafe " + cafe.name + " has been created.");
            res.redirect('/cafes');
        } 
    });
})
.get('/cafes/new', (req,res) => {
    res.render('cafes/create');
})
.get('/cafes/:id', (req,res) => {
    Cafe.findById(req.params.id).populate("comments").exec((err, foundCafe) => {
        if (err) throw err;
        else {
            res.render("cafes/show", {cafe: foundCafe});
        }
    });
})
.get('/cafes/:id/comments/new', (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) throw err;
        else {
            res.render("comments/create", {cafe: cafe});
        }
    })
})
.post('/cafes/:id/comments', (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) {
            console.log(err);
            res.redirect('/cafes');
        }
        else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) throw err;
                else {
                    cafe.comments.push(comment);
                    cafe.save();
                    res.redirect('/cafes/' + cafe._id);
                }
            })
        }
    })
});

app.listen(8080, () => {
    console.log("YelpCafe has started");
});
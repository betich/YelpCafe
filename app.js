var express         = require('express'),
    app             = express();
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Cafe            = require('./models/cafes'),
    Comment         = require('./models/comments'),
    User            = require('./models/users'),
    seedDB          = require('./seeds');

mongoose.connect("mongodb://localhost:27017/yelpcafe", {useUnifiedTopology: true, useNewUrlParser: true,});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

seedDB();

// Passport settings

app.use(require('express-session')({
    secret: 'sacret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // passing variable 'user' on every route
    res.locals.user = req.user;
    next();
});

// Routes
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
.post('/cafes', checkLogin, (req,res) => {
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
.get('/cafes/new', checkLogin, (req,res) => {
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
.get('/cafes/:id/comments/new', checkLogin, (req, res) => {
    Cafe.findById(req.params.id, (err, cafe) => {
        if (err) throw err;
        else {
            res.render("comments/create", {cafe: cafe});
        }
    })
})
.post('/cafes/:id/comments', checkLogin, (req, res) => {
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
})

// Auth
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

function checkLogin(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("YelpCafe has started");
});
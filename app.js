var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    Cafe            = require('./models/cafes'),
    Comment         = require('./models/comments'),
    User            = require('./models/users'),
    seedDB          = require('./seeds');

var Routes = {
    cafes: require('./routes/cafes'),
    comments: require('./routes/comments'),
    index: require('./routes/index')
};

mongoose.connect("mongodb://localhost:27017/yelpcafe", {useUnifiedTopology: true, useNewUrlParser: true,});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

seedDB(); // Seed

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
    // EX: let id = user._id
    res.locals.user = req.user;
    next();
});

// Routes
app.use('/', Routes.index)
.use('/cafes', Routes.cafes)
.use('/cafes/:id/comments', Routes.comments);

app.disable('x-powered-by');

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("YelpCafe has started");
});
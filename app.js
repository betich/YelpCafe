var express         = require('express'),
	app             = express(),
	bodyParser      = require('body-parser'),
	mongoose        = require('mongoose'),
	passport        = require('passport'),
	LocalStrategy   = require('passport-local'),
	methodOverride  = require('method-override'),
	flash           = require('connect-flash'),
	Cafe            = require('./models/cafes'),
	Comment         = require('./models/comments'),
	User            = require('./models/users'),
	seedDB          = require('./seeds');

var Routes = {
	cafes: require('./routes/cafes'),
	comments: require('./routes/comments'),
	index: require('./routes/index')
};

mongoose.connect(process.env.DATABASEURL || "mongodb://localhost:27017/yelpcafe",
	{ useUnifiedTopology: true, useNewUrlParser: true
}).then(() => {
	console.log("DB connected successfully");
}).catch(err => {
	console.log(err.message);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); // Lets /public be used for calling stylesheets
app.use(methodOverride('_method')); // Lets you use PUT, DELETE verbs by overriding POST

app.use(flash());
app.use(require('helmet')());

//seedDB(); // Seed

// Passport settings

app.use(
	require('express-session')({
		secret: 's4cr3t',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	// passing variable 'user' on every route
	res.locals.user = req.user;
	res.locals.msg_error = req.flash('error');
	res.locals.msg_success = req.flash('success');
	next();
});

// Routes
app.use('/', Routes.index).use('/cafes', Routes.cafes).use('/cafes/:id/comments', Routes.comments);

app.disable('x-powered-by');

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.info('\x1b[45m%s\x1b[0m', 'YelpCafe has started');
});

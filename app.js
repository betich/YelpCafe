var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var cafes = [
    {"name": "Starbucks", "img": "https://images.pexels.com/photos/569996/pexels-photo-569996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {"name": "Cafe Amazon", "img": "https://wba-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/Cafe-Amazon-2.jpg"},
    {"name": "Holly's Coffee", "img": "https://www.bluporthuahin.com/bluport/wp-content/uploads/2017/07/213-HOLLYS-COFFEE-01.jpg"},
    {"name": "Serpong Utara", "img": "https://wba-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/Cafe-Amazon-2.jpg"},
    {"name": "Gallery Drip", "img": "https://bk.asia-city.com/sites/default/files/drip2.jpg"},
    {"name": "Brave Roasters", "img": "https://www.nadiasigit.com/images/news/72_b4bdbb8be00af2bd67691ff062fa1525.jpg"},
    {"name": "Yelo House", "img": "https://venuee.s3-ap-southeast-1.amazonaws.com/2018/05/24/l/013jhkcbs9q.jpg"},
    {"name": "Mockingbird Cafe", "img": "https://www.treebo.com/blog/wp-content/uploads/2018/02/The-colourful-and-vibrant-interiors-of-Mockingbird-Cafe-.jpg"}
];

app.get('/', (req,res) => {
    res.render("landingpage");
})
.get('/cafes', (req,res) => {
    res.render("cafes", {cafes: cafes});
})
.post('/cafes', (req,res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCafe = {name: name, img: image};
    cafes.push(newCafe);
    res.redirect('/cafes');
})
.get('/cafes/create', (req,res) => {
    res.render('create.ejs');
});

app.listen(8080, () => {
    console.log("YelpCafe has started");
});
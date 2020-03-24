var app = require('express')();

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render("landingpage");
})
.get('/cafes', (req,res) => {
    var cafes = [
        {"name": "Starbucks", "img": "https://images.pexels.com/photos/569989/pexels-photo-569989.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
        {"name": "Cafe Amazon", "img": "https://wba-wpengine.netdna-ssl.com/wp-content/uploads/2017/11/Cafe-Amazon-2.jpg"},
        {"name": "Holly's Coffee", "img": "https://www.bluporthuahin.com/bluport/wp-content/uploads/2017/07/213-HOLLYS-COFFEE-01.jpg"}
    ];
    res.render("cafes", {cafes: cafes});
});

app.listen(8080, () => {
    console.log("YelpCafe has started");
});
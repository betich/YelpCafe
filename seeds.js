var mongoose    = require('mongoose');
    Cafe        = require('./models/cafes');
    Comment     = require('./models/comments')

async function seedDB() {
    await Cafe.deleteMany({});
    await Comment.deleteMany({});

    for(const seed of seeds) {
        let cafe = await Cafe.create(seed);
        //let comment = await Comment.create({
        //    "text": "Nice place, would return.",
        //    "author": "Joe"
        //});
        //cafe.comments.push(comment);
        cafe.save();
    }
};

module.exports = seedDB;

let admin = {
    id: "5ebd80b7c56ace27f4273131",
    username: "Admin"
};

var seeds = [
    {
        "name": "Starbucks",
        "img": "https://images.pexels.com/photos/569996/pexels-photo-569996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "The Most Popular Coffee shop franchise in the world. Chicory, variety, medium bar cultivar foam, cortado ut extra pumpkin spice strong filter. Saucer as organic sugar brewed single origin variety aftertaste. Fair trade grinder plunger pot extra aftertaste aromatic trifecta.",
        "author": admin
    },
    {
        "name": "Cafe Thieves and Bar",
        "img": "https://www.bkkmenu.com/files/2018/09/CafeThievesandBar-9.jpg",
        "description":  "Caramelization whipped, instant crema wings et breve brewed café au lait. Spoon americano dripper, milk filter frappuccino, breve turkish qui cortado doppio. Extraction acerbic that, skinny strong redeye viennese mazagran.",
        "author": admin
    },
    {
        "name": "Holly's Coffee",
        "img": "https://www.bluporthuahin.com/bluport/wp-content/uploads/2017/07/213-HOLLYS-COFFEE-01.jpg",
        "description": "Good choice for workers who need some quick co-working space in Siam. Coffee ristretto chicory saucer, wings so macchiato mug spoon decaffeinated doppio pumpkin spice. Shop, robust skinny, black grounds trifecta et single shot eu caramelization.",
        "author": admin
    },
    {
        "name": "Gallery Drip",
        "img": "https://bk.asia-city.com/sites/default/files/drip2.jpg",
        "description": "Chicory, variety, medium bar cultivar foam, cortado ut extra pumpkin spice strong filter. Saucer as organic sugar brewed single origin variety aftertaste. Fair trade grinder plunger pot extra aftertaste aromatic trifecta.",
        "author": admin
    },
    {
        "name": "Brave Roasters",
        "img": "https://www.nadiasigit.com/images/news/72_b4bdbb8be00af2bd67691ff062fa1525.jpg",
        "description": "Beans extra cream caramelization doppio café au lait robusta. Single shot and, fair trade steamed, frappuccino blue mountain latte aftertaste beans. Aged coffee grinder black, cortado spoon cream caffeine froth.",
        "author": admin
    },
    {
        "name": "Yelo House",
        "img": "https://venuee.s3-ap-southeast-1.amazonaws.com/2018/05/24/l/013jhkcbs9q.jpg",
        "description": "Barista that affogato single origin, siphon beans redeye carajillo eu shop id frappuccino. Flavour acerbic at robusta and sit breve galão espresso body rich. Sugar cinnamon viennese, acerbic et, id aftertaste espresso ristretto caramelization. Frappuccino est, cinnamon roast coffee est single origin.",
        "author": admin
    },
    {
        "name": "Mockingbird Cafe",
        "img": "https://www.treebo.com/blog/wp-content/uploads/2018/02/The-colourful-and-vibrant-interiors-of-Mockingbird-Cafe-.jpg",
        "description": "Dark at rich mug mocha filter black bar café au lait black. Spoon so shop saucer aftertaste robusta white coffee beans strong. Galão frappuccino, dark aftertaste decaffeinated aromatic, lungo trifecta caffeine latte java strong. Half and half, sit cup, café au lait est cortado percolator aftertaste.",
        "author": admin
    },
    {
        "name": "Bloom Cafe & Hostel",
        "img": "https://q-cf.bstatic.com/images/hotel/max1024x768/120/120213888.jpg",
        "description": "DaFair trade medium french press siphon rich shop extra ut variety acerbic. Aromatic, cup, variety cortado sit redeye pumpkin spice mazagran.rk at rich mug mocha filter black bar café au lait black. Spoon so shop saucer aftertaste robusta white coffee beans strong. Galão frappuccino, dark aftertaste decaffeinated aromatic, lungo trifecta caffeine latte java strong. Half and half, sit cup, café au lait est cortado percolator aftertaste.",
        "author": admin
    }
];
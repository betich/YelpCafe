var mongoose    = require('mongoose'),
    Cafe        = require('./models/cafes'),
    Comment     = require('./models/comments');

// Admin Object
let admin = {
    id: "5ed10f7405bd350017baed58",
    username: "Admin"
};

async function seedDB() {
    await Cafe.deleteMany({});
    await Comment.deleteMany({});

    for(const seed of seeds) {
        let cafe = await Cafe.create(seed);
        let comment = await Comment.create({
            "text": "Nice place.",
            "author": admin,
            "date": new Date(),
            "rating": 3
        });
        cafe.comments.push(comment);
        cafe.save();
    }
};

module.exports = seedDB;

var seeds = [
    {
        "name": "Starbucks",
        "img": "https://imgur.com/C3hXCDf.jpg",
        "description": "The Most Popular Coffee shop franchise in the world. Chicory, variety, medium bar cultivar foam, cortado ut extra pumpkin spice strong filter. Saucer as organic sugar brewed single origin variety aftertaste. Fair trade grinder plunger pot extra aftertaste aromatic trifecta.",
        "price": 2,
        "author": admin,
        "date": new Date(),
        "siteurl": "www.starbucks.com",
        "email": "starbucks@gmail.com",
        "phone": "123-456-789",
        "city": "Greensville"
    },
    {
        "name": "Cafe Thieves and Bar",
        "img": "https://imgur.com/RRt4GoT.jpg",
        "description":  "Caramelization whipped, instant crema wings et breve brewed café au lait. Spoon americano dripper, milk filter frappuccino, breve turkish qui cortado doppio. Extraction acerbic that, skinny strong redeye viennese mazagran.",
        "price": 2,
        "author": admin,
        "date": new Date(),
        "phone": "123-456-789",
        "city": "Greensville"
    },
    {
        "name": "Holly's Coffee",
        "img": "https://imgur.com/baBdGkh.jpg",
        "description": "Good choice for workers who need some quick co-working space in Siam. Coffee ristretto chicory saucer, wings so macchiato mug spoon decaffeinated doppio pumpkin spice. Shop, robust skinny, black grounds trifecta et single shot eu caramelization.",
        "price": 1,
        "author": admin,
        "date": new Date(),
        "siteurl": "www.test.com",
        "phone": "123-456-789",
        "city": "Greensville"
    },
    {
        "name": "Gallery Drip",
        "img": "https://imgur.com/wp9335b.jpg",
        "description": "Chicory, variety, medium bar cultivar foam, cortado ut extra pumpkin spice strong filter. Saucer as organic sugar brewed single origin variety aftertaste. Fair trade grinder plunger pot extra aftertaste aromatic trifecta.",
        "price": 3,
        "author": admin,
        "date": new Date(),
        "phone": "123-456-789",
        "city": "Greensville"
    },
    {
        "name": "Brave Roasters",
        "img": "https://imgur.com/VdN9nNt.jpg",
        "description": "Beans extra cream caramelization doppio café au lait robusta. Single shot and, fair trade steamed, frappuccino blue mountain latte aftertaste beans. Aged coffee grinder black, cortado spoon cream caffeine froth.",
        "price": 3,
        "author": admin,
        "date": new Date(),
        "phone": "123-456-789",
        "city": "Greensville"
    },
    {
        "name": "Yelo House",
        "img": "https://imgur.com/cIUQGHs.jpg",
        "description": "Barista that affogato single origin, siphon beans redeye carajillo eu shop id frappuccino. Flavour acerbic at robusta and sit breve galão espresso body rich. Sugar cinnamon viennese, acerbic et, id aftertaste espresso ristretto caramelization. Frappuccino est, cinnamon roast coffee est single origin.",
        "price": 2,
        "author": admin,
        "date": new Date(),
        "phone": "123-456-789",
        "city": "Greensville"
    },
    {
        "name": "Mockingbird Cafe",
        "img": "https://imgur.com/pnDRwkS.jpg",
        "description": "Dark at rich mug mocha filter black bar café au lait black. Spoon so shop saucer aftertaste robusta white coffee beans strong. Galão frappuccino, dark aftertaste decaffeinated aromatic, lungo trifecta caffeine latte java strong. Half and half, sit cup, café au lait est cortado percolator aftertaste.",
        "price": 1,
        "author": admin,
        "date": new Date(),
        "phone": "123-456-789",
        "city": "Greensville"
    },
    {
        "name": "Bloom Cafe & Hostel",
        "img": "https://imgur.com/Bzr2g1s.jpg",
        "description": "DaFair trade medium french press siphon rich shop extra ut variety acerbic. Aromatic, cup, variety cortado sit redeye pumpkin spice mazagran.rk at rich mug mocha filter black bar café au lait black. Spoon so shop saucer aftertaste robusta white coffee beans strong. Galão frappuccino, dark aftertaste decaffeinated aromatic, lungo trifecta caffeine latte java strong. Half and half, sit cup, café au lait est cortado percolator aftertaste.",
        "price": 2,
        "author": admin,
        "date": new Date(),
        "phone": "123-456-789",
        "city": "Greensville"
    }
];
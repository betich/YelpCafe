var mongoose = require('mongoose');

var cafeSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    price: Number,
    siteurl: String,
    email: String,
    phone: String,
    city: String,
    date: Date,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Comment = require('./comments');
cafeSchema.pre('remove', async function() {
    await Comment.remove({
        _id: {
            $in: this.comments
        }
    });
});

module.exports = mongoose.model("CoffeeShop", cafeSchema);
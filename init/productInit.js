const Product = require('../models/product');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user_1:mmmm2004@cluster0.q5fkmgt.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if(error) {
        console.log('problem in data base');
        console.log(error);
    } else {
        console.log("[nodemon] Connecting to DB...");
    }
});

const products = [
    new Product({
        pageTitle: 'Calivin Klein',
        metaDesc: 'The Calivin Klein is basically classified as belonging to the woody and floral family.',
        name: 'Calivin Klein',
        images: [{
            img: 'images/pppp/purple1_MG_1000.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/blue1_MG_0997.jpg',
            altText: '',
            order: 2
        }],
        desc: 'The Calivin Klein is basically classified as belonging to the woody and floral family. A scintillating woody fragrance of this Be eau de toilette lasts really long and keeps you refreshed throughout the day.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 10 to 12 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Blue Chanel',
        metaDesc: 'Fresh, clean and profoundly sensual, the woody, aromatic fragrance reveals the spirit of a man who chooses his own destiny with independence and determination.',
        name: 'Blue Chanel',
        images: [{
            img: 'images/pppp/black1_MG_1006.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/black2_MG_1016.jpg',
            altText: '',
            order: 2
        }],
        desc: 'Fresh, clean and profoundly sensual, the woody, aromatic fragrance reveals the spirit of a man who chooses his own destiny with independence and determination. A man who defies convention.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 12 to 14 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Lacoste White',
        metaDesc: 'Lacoste white is a rich and woody but gentle fragrance that pairs well with your fresh elegant ensemble.',
        name: 'Lacoste White',
        images: [{
            img: 'images/pppp/name_MG_0997.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/blue2_MG_1015.jpg',
            altText: '',
            order: 2
        }],
        desc: 'Lacoste white is a rich and woody but gentle fragrance that pairs well with your fresh elegant ensemble. The scent is pleasant but not overpowering, so you can feel confident wearing it whether you’re at work, at the gym, at a party, or on a date.',
        size: '60 ml',
        origin:'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 10 to 12 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Sauvage',
        metaDesc: 'Sauvage teams the freshness of a juicy, spicy Calabrian Bergamot note.',
        name: 'Sauvage',
        images: [{
            img: 'images/pppp/black1_MG_1006.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/black2_MG_1016.jpg',
            altText: '',
            order: 2
        }],
        desc: 'Sauvage teams the freshness of a juicy, spicy Calabrian Bergamot note. Mixed with the coolness of the night, the burning desert air exudes profound scents.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 12 to 14 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Oud Bouquet',
        metaDesc: 'It will make you the center of attraction wherever you go.',
        name: 'Oud Bouquet',
        images: [{
            img: 'images/pppp/orange1_MG_1003.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/orange2_MG_1013.jpg',
            altText: '',
            order: 2
        }],
        desc: 'It will make you the center of attraction wherever you go.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 24 to 30 hours'
        }],
        pricing: {
            price: 90,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Black Lexus',
        metaDesc: 'A tempting heart note composed around Praline, Cinnamon and Tolsu Balsam Smoothly lingering base note comprises Patchouli, Brazilian Rosewood and Black Amber.',
        name: 'Black Lexus',
        images: [{
            img: 'images/pppp/black1_MG_1006.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/black2_MG_1016.jpg',
            altText: '',
            order: 2
        }],
        desc: 'Highten your senses with captivating top notes of Lemon and Sage. A tempting heart note composed around Praline, Cinnamon and Tolsu Balsam Smoothly lingering base note comprises Patchouli, Brazilian Rosewood and Black Amber.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 12 to 14 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'VIP 212',
        metaDesc: 'The 212 VIP MEN fragrance captures the fresh energy of the rule-breakers, The young leaders show everyone else the way A blend at once new and woody.',
        name: 'VIP 212',
        images: [{
            img: 'images/pppp/purple1_MG_1000.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/blue1_MG_0997.jpg',
            altText: '',
            order: 2
        }],
        desc: 'The 212 VIP MEN fragrance captures the fresh energy of the rule-breakers, The young leaders show everyone else the way A blend at once new and woody, This unique scent combines intriguing notes of caviar lime With a hint of frozen mint for a vibrant result.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 10 to 12 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'BMW Perfume',
        metaDesc: 'BMW perfume is a modern and modern fragrance rich in fresh and aromatic notes, adding a touch of attractiveness and elegance for men.',
        name: 'BMW Perfume',
        images: [{
            img: 'images/pppp/black1_MG_1006.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/black2_MG_1016.jpg',
            altText: '',
            order: 2
        }],
        desc: 'BMW perfume is a modern and modern fragrance rich in fresh and aromatic notes, adding a touch of attractiveness and elegance for men.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 15 to 18 hours'
        }],
        pricing: {
            price: 85,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Pink Sugar',
        metaDesc: 'Pink Sugar by aquolina is infused with a heavenly sweet scent that blends fruity essences; This refreshing perfume will help you create an aura of confidence.',
        name: 'Pink Sugar',
        images: [{
            img: 'images/pppp/purple1_MG_1000.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/blue1_MG_0997.jpg',
            altText: '',
            order: 2
        }],
        desc: 'Pink Sugar by aquolina is infused with a heavenly sweet scent that blends fruity essences; This refreshing perfume will help you create an aura of confidence.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Men',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 24 to 30 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Euphoria',
        metaDesc: 'This Euphoria perfume has the perfect start with the fantastic notes of persimmon, raspberry, passionfruit, peach, green notes, and pomegranate.',
        name: 'Euphoria',
        images: [{
            img: 'images/pppp/red1_MG_1002.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/red22_MG_1012.jpg',
            altText: '',
            order: 2
        }],
        desc: 'This Euphoria perfume has the perfect start with the fantastic notes of persimmon, raspberry, passionfruit, peach, green notes, and pomegranate. The beautiful amalgamation of these fruity, tangy, woody nuanced notes produces a unique exotic flavor and aroma that will help you create an unforgettable look and feel.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Women',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 12 to 14 hours'
        }],
        pricing: {
            price: 80,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    }),
    new Product({
        pageTitle: 'Rose Vanilla',
        metaDesc: 'Roses Vanille will be loved by women who like sweet vanilla, especially in a stunning combination with roses. Roses Vanille is suitable for day and evening wear throughout the year.',
        name: 'Rose Vanilla',
        images: [{
            img: 'images/pppp/purple1_MG_1000.jpg',
            altText: '',
            order: 1
        }, {
            img: 'images/cccc/blue1_MG_0997.jpg',
            altText: '',
            order: 2
        }],
        desc: 'Roses Vanille will be loved by women who like sweet vanilla, especially in a stunning combination with roses. Roses Vanille is suitable for day and evening wear throughout the year. It always gives the wearer a feeling of the exceptional and a touch of true luxury.',
        size: '60 ml',
        origin: 'western',
        fragrance: 'For Women',
        productType: 'sprayer',
        visibility: 'published',
        details: [{
            classification: 'concentrantion',
            value: 'from 10 to 12 hours'
        }],
        pricing: {
            price: 75,
            oldPrice: 0,
            discount: 0

        },
        stock: 1,
        numReviews: 0
    })
];



let done = 0;
for(let i = 0; i < products.length; i++) {
    products[i].save((error, doc) => {
        if(error) {
            console.log(error);
        } else {
            console.log(doc);
            done++
        }
        if(done === products.length) {
            mongoose.disconnect();
        }

    });
}


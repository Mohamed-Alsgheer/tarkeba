const Question = require('../models/question');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user_1:mmmm2004@cluster0.q5fkmgt.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if(error) {
        console.log('problem in data base');
        console.log(error);
    } else {
        console.log("[nodemon] Connecting to DB...");
    }
});

const questions = [
    new Question({
        question: 'How much does shipping cost?',
        answer: 'Delivery inside Cairo and Giza will cost 20LE'
    }),
    new Question({
        question: 'How long does delivery take?',
        answer: `Delivery takes 2-4 working days.
        (Fridays and officail holidays are excluded).`
    }),
    new Question({
        question: "What payment methods're available?",
        answer: 'Just paiement when receiving.'
    }),
    new Question({
        question: 'Do you have a place to pick up my order from and check other products by myself?',
        answer: `Yes, you can pick up your order and check other perfumes
        from my location here is the address: Imbaba, Saft El Laban, El Deeb Street, second floor.`
    }),
    new Question({
        question: "What if I don't like my order?",
        answer: "If you're not happy with your order you have all the right to return it back with a 20LE delivery fees."
    }),
    new Question({
        question: 'How do I exchange a product?',
        answer: `You can exchange the perfume within 3 days of recieving it.
        The exchange fees will be 20LE.`
    }),
]


let done = 0;
for(let i = 0; i < questions.length; i++) {
    questions[i].save((error, doc) => {
        if(error) {
            console.log(error);
        } else {
            console.log(doc);
            done++
        }
        if(done === questions.length) {
            mongoose.disconnect();
        }

    });
}
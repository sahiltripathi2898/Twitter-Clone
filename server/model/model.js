const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema ({
    name : String ,
    content : String,
    createdDate: Date
    
});

module.exports = mongoose.model('Tweets',tweetSchema);
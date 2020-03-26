const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

const tweets = require('./model/model')

app.use(cors());
app.use(express.json());

// Data Base
const db = require('./config/key');
mongoose.connect(db.url, {useNewUrlParser: true , useUnifiedTopology: true })
    .then( console.log("DB Connected"))
    .catch(err => {
        console.log(err)
    });



// GET request
app.get('/tweet', (req,res) =>{
   tweets.find()
   .then(tweetz => {
       res.send(tweetz)       
   })
   .catch(err => {
       console.log(err)
   })
});

//Post request
function isValidTweet(tweet) {
    return tweet.name && tweet.name.toString().trim() !== '' && tweet.name.toString().trim().length <= 50 &&
      tweet.content && tweet.content.toString().trim() !== '' && tweet.content.toString().trim().length <= 140;
  }
  
  
  
  app.post('/tweet', (req, res) => {
   
    if (isValidTweet(req.body)) {
     
        const tweet = new tweets ({
        name: req.body.name,
        content: req.body.content,
        createdDate : new Date()
      });
      
  
      tweet.save()
        .then(createdtweet => {
          res.json(createdtweet);
        });
    } else {
      res.status(422);
      res.json({
        message: 'Hey! Name and Content are required! Name cannot be longer than 50 characters. Content cannot be longer than 140 characters.'
      });
    }
  });
  
// connection to PORT
const PORT = process.env.PORT || '4000';
app.listen(PORT,(req,res) => {
    console.log(`Listening at Port 4000`)
});
    

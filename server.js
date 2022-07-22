const express = require('express');
const connectOnMongo = require('./config/connectOnMongo');
const user = require('./routes/user');
const config = require('config');
const credit = require('./routes/credit');
const PORTC = config.get('PORT');
const boncommande = require('./routes/boncommande');
const caisse = require('./routes/caisse');

var app = express();
const PORT = PORTC || 5000 ;
connectOnMongo();
app.use(express.json());
app.listen(PORT,(err) => err ? console.log(err.message) : console.log('your app succesfuly run on PORT : '+PORT));
app.use('/user',user);
app.use('/credit',credit);
app.use('/boncommande',boncommande);
app.use('/caisse',caisse);

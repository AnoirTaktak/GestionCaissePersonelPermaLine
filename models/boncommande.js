const mongoose = require('mongoose');
const user = require('./user');
const Schema = mongoose.Schema;

const boncommandeSchema = new Schema({
  
  user : String,
  datebc: {
    type: Date,
    default: Date.now,
  },
  articles :[{
    article : String,
    num : Number
  }],
  cbon : Boolean 
});

module.exports = Boncommande = mongoose.model('Boncommande', boncommandeSchema);
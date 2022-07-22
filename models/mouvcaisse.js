
const mongoose = require('mongoose');
const user = require('./user');
const Schema = mongoose.Schema;

const mouvcaisseSchema = new Schema({
  typetrans: String,
  naturetrans: String,
  description : String,
  user : String,
  datetrans: {
    type: Date,
    default: Date.now,
  },
  montanttrans : Number,
});

module.exports = Mouvcaisse = mongoose.model('Mouvcaisse', mouvcaisseSchema);
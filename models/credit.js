
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditSchema = new Schema({
  nomcred : String,
  details : String,
  montantcred : Number,
});

module.exports = Credit = mongoose.model('Credit', creditSchema);
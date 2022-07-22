
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caisseSchema = new Schema({
  etatcaisseesp : Number,
  etatcaissechq : Number
});

module.exports = Caisse = mongoose.model('Caisse', caisseSchema); 
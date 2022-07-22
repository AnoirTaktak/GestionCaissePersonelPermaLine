const mongoose = require('mongoose');
//require('dotenv').config({ path: './config/.env' });
const config = require('config');
const db = config.get('db');

const connectOnMongo = async() => {
    try {
        await mongoose.connect(db);
        console.log('DataBase is connected go on ...');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectOnMongo;
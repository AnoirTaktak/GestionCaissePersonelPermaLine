const jwt  = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secret');
const User = require('../models/user');

const verifauth = async (req,res,next) => {
    
    try {
        let token = req.headers.authorization;
        const decoded = await jwt.verify(token,secret);
        if (!decoded) return res.status(400).json({msg : ' token invalide '});
        const user = await User.findById(decoded.id);
        if(!user) {return res.status(400).json({msg:'token invalide '})} else {req.user=user; next()}
    
    } catch (error) {
        res.status(500).json({err :error.message})
    }
};

module.exports = verifauth;
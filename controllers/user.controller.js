
const User = require('../models/user');
var bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secret');


//afficher la liste d'utilisateur pour l'admin
//en cas ou il veut supprimer quelque un ou verifier l'existance de quelque un 

exports.affuser = async(req,res) => {
    try {
        allusers = await User.find();
        res.status(200).json({allusers});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

// ajouté un utilisateur a partir d'un administrateur
// verifier s'il existe deja le nom utilisateur ou non
// hashé le mdp et en fin l'ajouté

exports.ajoutuser = async(req,res) => {
  const  {username,password,type} = req.body ;
  const usernameex = await User.findOne({username});
 if (usernameex)  res.status(409).json({msg : 'pseudo deja utilsé'}) ;
try {
     const newuser = new User({
        username,
        password,
        type
     });
     var salt = await bcryptjs.genSalt(10);
     var hash = await bcryptjs.hashSync(password, salt);
     newuser.password = hash ;
     await newuser.save();
     res.status(200).json({msg : 'un nouveau utilisateur '+newuser.username+' a été ajouté avec succes bon courage '});
     
} catch (error) {
    res.status(500).json({msg:error.message});
}
}

//le login d'un utilisateur soit admin ou employee
//entré le username et le mdp verifier le username compare le mpd
//creation d'un token ou une session 

exports.loginuser = async(req,res) => { 
    try {
        const {username,password} = req.body ;
        const usernameex = await User.findOne({username});
            if (!usernameex) res.status(404).json({msg : 'verifier vos coordonnés '});
        const isMatch = await bcryptjs.compare(password, usernameex.password);
            if (!isMatch) res.status(404).json({msg : 'verifier vos coordonnés '});
        const payload = {
            id:usernameex._id,
            name:usernameex.username,
            type:usernameex.type
         }
         const token = jwt.sign(payload,secret);
         res.send({
            token,
            user:{
                id:usernameex._id,
                username:usernameex.username,
                type:usernameex.type
            }
         });    
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
};

//fonction d'autho 

exports.auth = (req,res) => {
    res.send(req.user);
};

//un utilisateur peut modifier leur propre parametres
//recherche classique par le nom d'utilsateur 
//verifier les nouvelles parametre et effectuer les mise a jour


exports.modifieruser = async(req,res) => {
try {
    const _id= req.params.id;
    var {username,password} = req.body;
    const usernameex = await User.findOne({username});
        if (usernameex)  res.status(409).json({msg : 'pseudo deja utilsé'}) ;
    var salt = await bcryptjs.genSalt(10);
    var hash = await bcryptjs.hashSync(password, salt);
        password = hash;
    await User.findByIdAndUpdate({_id},{username,password});
    
    res.status(200).json({msg:'le mise a jour est effectué'});
    
} catch (error) {
    res.status(501).json({msg:error.message});
}
}

//simple methode de suppression de la part d'un admin 
//suppression avec un simple bouton

exports.suppuser = async(req,res) => {
    try {
        
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({msg : 'utilisateur supprimé avec succes '})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}


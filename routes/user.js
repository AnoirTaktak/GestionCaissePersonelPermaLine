const express = require('express');
const { ajoutuser, loginuser, auth, modifieruser, suppuser, affuser } = require('../controllers/user.controller');
const verifauth = require('../middlewares/auth');
const usertype = require('../middlewares/type');
const { ajoutuserconditions,validator, loginuserconditions, modifieruserconditions } = require('../middlewares/validator');
const router = express.Router();

// declaration des routes specifique pour le model user
// API links pour utiliser on front

router.post('/ajoutuser',ajoutuserconditions(),validator,verifauth,usertype('admin'),ajoutuser);
router.post('/loginuser',loginuserconditions(),validator,loginuser);
router.get('/auth',verifauth,auth);
router.put('/modifieruser/:id',modifieruserconditions(),validator,verifauth,modifieruser);
router.delete('/suppuser/:id',verifauth,usertype('admin'),suppuser);
router.get('/affuser',verifauth,usertype('admin'),affuser);

module.exports = router ;
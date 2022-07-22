const express = require('express');
const { affichercredits, affichercreditparpersonne, suppcredit, modifiercredit, ajoutcredit } = require('../controllers/credit.controller');
const verifauth = require('../middlewares/auth');
const usertype = require('../middlewares/type');
const { ajoutcreditconditions,validator } = require('../middlewares/validator');
const router = express.Router();

router.post('/ajoutcredit',ajoutcreditconditions(),validator,verifauth,ajoutcredit);
router.delete('/suppcredit/:id',verifauth,usertype('admin'),suppcredit);
router.get('/affichercreditpp/:name',verifauth,affichercreditparpersonne);
router.get('/affichercredits',verifauth,affichercredits)
router.put('/modifiercredit/:id',verifauth,modifiercredit)
module.exports = router ;
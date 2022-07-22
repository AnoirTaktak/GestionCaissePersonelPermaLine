const express = require('express');
const { ajoutcaisse, affichercaisse, affichermouv } = require('../controllers/caisse.controller');
const verifauth = require('../middlewares/auth');
const usertype = require('../middlewares/type');
const { ajoutcaisseconditions,validator } = require('../middlewares/validator');
const router = express.Router();

router.post('/ajoutcaisse',ajoutcaisseconditions(),validator,verifauth,ajoutcaisse);
router.get('/affichercaisse',verifauth,affichercaisse);
router.get('/affichermouv',verifauth,affichermouv)

module.exports = router ;
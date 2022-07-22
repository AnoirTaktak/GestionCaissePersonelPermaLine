const express = require('express');
const { ajoutbc, modifierbc, afficherbc, afficherbcpd } = require('../controllers/boncommande.controller');
const verifauth = require('../middlewares/auth');
const usertype = require('../middlewares/type');
const { ajoutboncommandeconditions,validator } = require('../middlewares/validator');
const router = express.Router();

router.post('/ajoutboncommande',ajoutboncommandeconditions(),validator,verifauth,ajoutbc);
router.put('/modifierboncommande/:id',verifauth,modifierbc);
router.get('/afficherbc',verifauth,afficherbc);
router.get('/afficherbcpd',verifauth,afficherbcpd);



module.exports = router ;
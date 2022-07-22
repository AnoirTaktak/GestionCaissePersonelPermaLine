const { check , validationResult } = require("express-validator");

// verifier les champs d'ajout d'un utilisateur

exports.ajoutuserconditions = () => [
    check('username','champ obligatoire').notEmpty(),
    check('password','champ obligatoire').notEmpty(),
    check('type','champ obligatoire ').notEmpty(),
    check('type','attention ce champ doit etre admin ou employee').isIn(['admin', 'employee']),
    check('password','champ obligatoire').isLength({min : 6})
];
  
// verifier les champs de login 

exports.loginuserconditions = () =>  [
    check('username','champ obligatoire').notEmpty(),
    check('password','champ obligatoire').notEmpty(),
];

// verifier les champs lors de modification

exports.modifieruserconditions = () => [
    check('username','champ obligatoire').notEmpty(),
    check('password','champ obligatoire').notEmpty(),
    check('password','champ obligatoire').isLength({min : 6})
];


//verifier les champs d'ajout et de retrait de la caisse

exports.ajoutcaisseconditions = () => [
    check('typetrans','la transaction ne peut etre que ajout ou retrait').isIn(['ajout','retrait']),
    check('naturetrans','la nature de ce transaction doit etre cheque ou espece').isIn(['cheque','espece']),
    check('montanttrans','champ obligatoire').notEmpty()
];

//verifier les champs d'ajout et de retrait de la credit

exports.ajoutcreditconditions = () => [
    check('montantcred','champ obligatoire').notEmpty(),
    check('nomcred','champ obligatoire').notEmpty()
];

exports.ajoutboncommandeconditions = () => [
    //check('description','champ obligatoire').notEmpty(),
    check('articles','champ obligatoire').notEmpty()
];

//validator pour verifier tout les condition ce dessus son respecter on verification
//si les tableaux sont vides


exports.validator = (req,res,next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(406).json({errors : errors.array()})
};


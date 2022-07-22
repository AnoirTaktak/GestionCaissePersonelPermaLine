const Credit = require('../models/Credit');



//afficher la liste de mouvements des credit pour l'admin
 

exports.affichercredits = async(req,res) => {
    try {
        credits = await Credit.find();
        res.status(200).json({credits});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.affichercreditparpersonne = async(req,res) => {
    try {
        const nomcred = req.params.name;
        creditpp = await Credit.findOne({nomcred});
        res.status(200).json({creditpp});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}


exports.suppcredit = async(req,res) => {
    try {
        await Credit.findByIdAndDelete(req.params.id);
        res.status(200).json({msg : 'Credit supprimé avec succes '})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}


exports.modifiercredit = async(req,res) => {
    try {
        const _id= req.params.id;
        var {montantcred,details} = req.body;
        await Credit.findByIdAndUpdate({_id},{montantcred,details});
        
        res.status(200).json({msg:'le mise a jour est effectué avec succes'});
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
    }


    exports.ajoutcredit = async(req,res) => {
        const  {nomcred,details,montantcred} = req.body ;
        const creditex = await Credit.findOne({nomcred});
       if (creditex)  res.status(409).json({msg : 'crediteur deja exist modifier le'}) ;
      try {
           const newcredit = new Credit({
              nomcred,
              details,
              montantcred
           });
          
           await newcredit.save();
           res.status(200).json({msg : 'un nouveau credit '+newcredit.nomcred+' a été ajouté avec succes avec un montant : '+montantcred});
           
      } catch (error) {
          res.status(500).json({msg:error.message});
      }
      }


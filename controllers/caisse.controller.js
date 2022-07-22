const Mouvcaisse = require('../models/mouvcaisse');
const Caisse = require('../models/caisse');

exports.ajoutcaisse = async(req,res) => {
    try {
        const {typetrans,naturetrans,description,user,datetrans,montanttrans} = req.body;
        const newmouv = new Mouvcaisse ({
            typetrans,naturetrans,description,user,datetrans,montanttrans
        }) ;
        await newmouv.save();
        const  cais = await Caisse.findById("62ce8cc764797b6235562c5e");
        
        if (naturetrans=='espece')
            if (typetrans=='ajout')
                {cais.etatcaisseesp = cais.etatcaisseesp+montanttrans ;}else{cais.etatcaisseesp=cais.etatcaisseesp-montanttrans;}
        if(naturetrans=='cheque')
            if (typetrans=='ajout')
                {cais.etatcaissechq = cais.etatcaissechq+montanttrans ;}else{cais.etatcaissechq=cais.etatcaissechq-montanttrans;}
        const etatcaisseesp = cais.etatcaisseesp;
        const etatcaissechq = cais.etatcaissechq;
        await Caisse.findByIdAndUpdate("62ce8cc764797b6235562c5e",{etatcaisseesp,etatcaissechq});
        
        res.status(200).json({cais,newmouv});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.affichercaisse = async(req,res) => {
    try {
        const etatcaisse = await Caisse.find();
        res.status(200).json({etatcaisse});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.affichermouv = async(req,res) => {
    try {
        const mouv = Mouvcaisse.find();
        res.status(200).json({mouv});
    } catch (error) {
        res.status(500).json({msg:error.message}); 
    }
}


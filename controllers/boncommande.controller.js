const Boncommande = require('../models/boncommande');

exports.afficherbc = async(req,res) => {
     
     try {
        const bcs = await Boncommande.find();
        res.status(200).json({bcs});
     } catch (error) {
        res.status(500).json({msg:error.message});
     }
} 

exports.afficherbcpd = async(req,res) => {
    try {
        const datedebut = new Date(req.body);
        const iso = datedebut.toISOString();
        const bcs = await Boncommande.find({
            "datebc" : { iso }
        });
        res.status(200).json({bcs});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
};

exports.ajoutbc = async(req,res) => {
    try {
        const {user,datebc,articles,cbon} = req.body
        const newbc = new Boncommande({
            user,datebc,articles,cbon
        }) ;
        await newbc.save(newbc);
        res.status(200).json({newbc});
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
};

exports.modifierbc = async(req,res) => {
    try {
        const _id =req.params.id;
        const bc = await Boncommande.findOne({_id});
        const tab2 =  bc.articles;
        const tab1 = req.body
        const articles = tab1.articles.concat(tab2);
        await Boncommande.findByIdAndUpdate({_id},{articles});
        res.status(200).json({articles})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
};
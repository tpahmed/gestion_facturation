// importation des variables d'environement
require("dotenv").config();

// import du modules
const compression = require('compression')
const express = require("express");
const body_parser = require("body-parser");
const mysql = require("mysql2");


// creation du connection mysql

const db = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.PORT,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DB
});


// creation de l'application express

const app = express()
const router = express.Router();
const PORT = 4444;

// utilisation des middlewares

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:1}));
app.use(allowCrossDomain);
app.use(compression());
app.use('/api',router);

// creation des routes

// afficher les societes enregistre

router.get('/societes',(req,res)=>{
    db.query("SELECT * FROM societe;",(err,result)=>{
        if (err){
            res.json({"status":"erreur","data":[]}).status(500);
            return;
        }
        res.json({"status":"reussis","data":result});
    })
});

// afficher les clients enregistre

router.get('/clients',(req,res)=>{
    db.query("SELECT * FROM client;",(err,result)=>{
        if (err){
            res.json({"status":"erreur","data":[]}).status(500);
            return;
        }
        res.json({"status":"reussis","data":result});
    })
});

// afficher les devis enregistre

router.get('/devis',(req,res)=>{
    db.query("SELECT * FROM devis;",(err,result)=>{
        if (err){
            res.json({"status":"erreur","data":[]}).status(500);
            return;
        }
        res.json({"status":"reussis","data":result});
    })
});

// afficher les command d'une factures par id

router.get('/devis/:id',(req,res)=>{
    db.query("SELECT * FROM commande_devis where id_devis = ?;",[req.params.id],(err,result)=>{
        if (err){
            res.json({"status":"erreur","data":[]}).status(500);
            return;
        }
        res.json({"status":"reussis","data":result});
    })
});

// afficher les factures enregistre

router.get('/factures',(req,res)=>{
    db.query("SELECT * FROM facture;",(err,result)=>{
        if (err){
            res.json({"status":"erreur","data":[]}).status(500);
            return;
        }
        res.json({"status":"reussis","data":result});
    })
});

// afficher les command d'une factures par id

router.get('/factures/:id',(req,res)=>{
    db.query("SELECT * FROM commande_facture where id_facture = ?;",[req.params.id],(err,result)=>{
        if (err){
            res.json({"status":"erreur","data":[]}).status(500);
            return;
        }
        res.json({"status":"reussis","data":result});
    })
});

// afficher les devis facture enregistre

router.get('/devisfacture',(req,res)=>{
    db.query("SELECT * FROM devis_facture;",(err,result)=>{
        if (err){
            res.json({"status":"erreur","data":[]}).status(500);
            return;
        }
        res.json({"status":"reussis","data":result});
    })
});


// ajouter une societe

router.post('/societes',(req,res)=>{
    db.query("insert into societe values (NULL,?,?,?,?,?,?);",[
        req.body.raison_s,
        req.body.contact,
        req.body.tel,
        req.body.patente,
        req.body.ICE,
        req.body.RC
    ],(err,result)=>{
        if (err){
            res.json({"status":"erreur","message":err}).status(500);
            console.log(err);
            return;
        }
        res.json({"status":"reussis","message":result});
    })
});

// ajouter un client

router.post('/clients',(req,res)=>{
    db.query("insert into client values (NULL,?,?,?,?);",[
        req.body.raison_s,
        req.body.ICE,
        req.body.adresse,
        req.body.tel
    ],(err,result)=>{
        if (err){
            res.json({"status":"erreur","message":err}).status(500);
            return;
        }
        res.json({"status":"reussis","message":result});
    })
});

// ajouter un devis

router.post('/devis',(req,res)=>{
    db.query("insert into devis values (NULL,?,?);",[
        req.body.id_client,
        req.body.date_devis
    ],(err,result)=>{
        if (err){
            res.json({"status":"erreur","message":err}).status(500);
            return;
        }
        res.json({"status":"reussis","message":result});
    })
});

// ajouter une commmande devis

router.put('/devis',(req,res)=>{
    db.query("insert into commande_devis values (NULL,?,?,?,?,?);",[
        req.body.id_devis,
        req.body.reference,
        req.body.titre,
        req.body.prix,
        req.body.quantite
    ],(err,result)=>{
        if (err){
            res.json({"status":"erreur","message":err}).status(500);
            return;
        }
        res.json({"status":"reussis","message":result});
    })
});

// ajouter une facture

router.post('/factures',(req,res)=>{
    db.query("insert into facture values (NULL,?,?);",[
        req.body.id_client,
        req.body.date_devis
    ],(err,result)=>{
        if (err){
            res.json({"status":"erreur","message":err}).status(500);
            return;
        }
        res.json({"status":"reussis","message":result});
    })
});

// ajouter une commmande facture

router.put('/factures',(req,res)=>{
    db.query("insert into commande_facture values (NULL,?,?,?,?,?);",[
        req.body.id_facture,
        req.body.reference,
        req.body.titre,
        req.body.prix,
        req.body.quantite
    ],(err,result)=>{
        if (err){
            res.json({"status":"erreur","message":err}).status(500);
            return;
        }
        res.json({"status":"reussis","message":result});
    })
});























// gestion des erreur

app.get('*',(req,res)=>{
    res.json({"status":"erreur","message":"route introuvable"});
})

// exposer au port 4444

app.listen(PORT);
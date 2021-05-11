// importations

const bcrypt = require('bcrypt');
const auth = require('../middleware/jwt-auth');
var models = require('../models');
const user = require('../models/user');

// constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;  /// une maj une min et un chiffre 

// routes

module.exports = {

    ///  creation d'un user
    signup: function (req, res) {
       // Récupération des parametres du user
       const nom = req.body.nom;
       const prenom = req.body.prenom;
       const email = req.body.email;
       const password = req.body.password;
       const isAdmin = req.body.isAdmin;
       
        // vérification qu'il n y a pas de parametre manquant
       if (nom == null || prenom == null || email == null || password == null || isAdmin == null) {
        return res.status(400).json({error: 'paramètre manquant'});
        }

        // controle de l'Email et du password avec les  REGEX prédéfinis
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).send({'error': 'email incorrect'})
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({'error': 'le password doit contenir une maj une min et un chiffre'})
        } 

        //Vérification de l'existatnce ou pas du User
        models.User.findOne({
            attributes: ['email'],
            where: { email: email}
        })  
        .then(function(userFound){
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) { // hachage du password
                    var newUser = models.User.create({    
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: bcryptedPassword,
                        isAdmin: isAdmin,            
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({'error': 'on ne peut créer le user'});
                    })
                });
            }else {
                return res.status(400).json({'error': 'user existe deja'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'on ne peut créer le user'});
        });
    },
//// Connection d'un user

    login: function(req, res) {
        // récupération des parametres de connection
        const email = req.body.email;
        const password = req.body.password;

        // vérification qu'il n y a pas de parametre manquant
        if (email == null || password == null) {
            return res.status(400).json({'error': 'parametre manquant'});
        }

        // Récupération du user avec son Email
        models.User.findOne({ 
            where: {email: email}
        })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(err, resBcrypt) { // comparaison du password
                    if (resBcrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': auth.generateTokenForUser(userFound)// token généré dans jwt-auth.js
                        });
                    }else {
                        return res.status(403).json({'error': 'password invalide'});
                    }
                })
            }else {
                return res.status(404).json({'error': ' user inexistant dans la DB'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'verification impossibe'});
        })
    },

    ///  afiicher detail d'un user
    detailsUser: function(req, res ) {

        //Vérification de l'authentification et Récuperation de l'identifiant du user
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);
        if (userId < 0)
        return res.status(400).json({'error' : 'token erronné'});

        // récupération du user à afficher
        models.User.findOne({
            attributes: ['id', 'nom', 'prenom', 'email'], // attributs a afficher
            where: { id: userId}
        }).then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({'error': 'user introuvable'})
            }
        }).catch(function(err) {
            res.status(500).json({'error': 'user introuvable'})
        });
    },
  
    ///   modification d'un user
    modifyUser: function(req, res) {
        //Vérification de l'authentification et Récuperation de l'identifiant du user
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);

        // declaration des parametres
        
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const isAdmin = req.body.isAdmin;
        const password = req.body.password;

        models.User.findOne({
            attributes: ['id','nom', 'prenom', 'email', 'isAdmin', 'password'],  ////  , 'isAdmin'
            where: { id: userId}
        }).then(function(userFound) {
            if (userFound) {
            }
            // modification des parametres du user
            const modifiedUser = userFound.update({
                nom: (nom ? nom : user.nom),// si parametre ok je valide sinon je conserve l'ancien paramètre
                prenom: (prenom ? prenom : user.prenom),
                email: (email ? email : user.email),
                isAdmin: ( isAdmin ? isAdmin : user.isAdmin),

            }).then(function(modifiedUser){
                return res.status(200).json(({'message': 'Le profile a été modifié !'}))
            }).catch(function(err) {
                res.status(500).json({'error': 'Le profile ne peut etre modifié'})
            });

        }).catch(function(err) {
            res.status(500).json({'error': 'user introuvable'})
        });

    }, 
    
    
      listeUsers: function (req, res) {
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);

       // var fields = req.query.fields;  // selectionner les colonnes souhaitées
       // var order = req.query.order;  //  ordre d'affichage des messages

        models.User.findAll({
          //  where: {id: userId},
         //  attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
          // order: [(order != null) ? order.split(':') : ['titre', 'ASC']],
           attributes: ['id', 'nom', 'prenom', 'email', 'isAdmin'],
        }).then(function(users){
            if (users) {
                res.status(200).json(users);
            }else {
                res.status(404).json({'error': 'aucun user trouvé !'});
            }
        }).catch(function(err){
            res.status(500).json({'error' : 'champs invalides'})
        })
    },
   /* deleteUser: function(req, res) {
        //Vérification de l'authentification et Récuperation de l'identifiant du user
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);

        //console.log(userId)
        // declaration des parametres
        var userId = req.params.id;  // efface tous les profils
       // var isAdmin = req.params.isAdmin
       console.log(userId);

        models.User.findOne({
         //  attributes: ['id', 'nom', 'prenom', 'email', 'isAdmin'],
            where: { id: userId,}
        }).then(function(userFound) {
            if (userFound) {
            // return res.status(200).json(userFound);
             console.log(userFound);
            }
                const deletedUser = userFound.destroy({
                    
                }).then(function(deletedUser){
                    return res.status(200).json(({'message': 'Le profile a été supprimé !'}))
                }).catch(function(err) {
                    res.status(500).json({'error': 'Le profile ne peut etre supprimé !'})
                });
            
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({'error': 'user introuvable'})
        });
           
       
    }*/
    deleteUser: function(req, res) {
        //  récupération autorisation header
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);

        // declaration des parametres
        var userId = req.params.id;
        
       console.log(userId);

        models.User.findOne({
          // attributes: ['id', 'nom', 'prenom', 'email', 'isAdmin'],
            where: { id: userId}
        }).then(function(userFound) {
            if (userFound) {
             // return res.status(200).json(userFound);
             //console.log(userFound);
            }

            const deletedUser = userFound.destroy({
                
            }).then(function(deletedUser){
                return res.status(200).json(({'message': 'Le profile a été supprimé !'}))
            }).catch(function(err) {
                res.status(500).json({'error': 'Le profile ne peut etre supprimé !'})
            });

        }).catch(function(err) {
            console.log(err);
            res.status(500).json({'error': 'user introuvable'})
        });
           
       
    },
    
   
} 

        
       
    
    




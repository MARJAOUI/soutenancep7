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
    signup: function (req, res) {
       // parametres 
       const nom = req.body.nom;
       const prenom = req.body.prenom;
       const email = req.body.email;
       const password = req.body.password;
       const isAdmin = false;
       

       if (nom == null || prenom == null || email == null || password == null || isAdmin == null) {
        return res.status(400).json({error: 'paramètre manquant'});
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).send({'error': 'email incorrect'})
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({'error': 'le password doit contenir une maj une min et un chiffre'})
        } 
        models.User.findOne({
            attributes: ['email'],
            where: { email: email}
        })  
        .then(function(userFound){
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    var newUser = models.User.create({    
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: bcryptedPassword,
                        isAdmin: isAdmin,            ///// à 0
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
    login: function(req, res) {
        // parametres
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'parametre manquant'});
        }
        models.User.findOne({
            where: {email: email}
        })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(err, resBcrypt) {
                    if (resBcrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': auth.generateTokenForUser(userFound)
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
    detailsUser: function(req, res ) {
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);
        if (userId < 0)
        return res.status(400).json({'error' : 'token erronné'});

        models.User.findOne({
            attributes: ['id', 'nom', 'prenom', 'email'],
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
  /*  updateUserProfile: function(req, res) {
        //  récupération autorisation header
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);

        // declaration des parametres
        
       var nom = req.params.nom;
        var prenom = req.params.prenom;
        var email = req.params.email;
        var password = req.params.password;
        var isAdmin = req.params.isAdmin;
        models.User.findOne({
        //    attributes: ['id'],  ////  , 'isAdmin'   tout
            where: { id: userId}
        }).then(function(userFound) {
            if (userFound) {
                console.log(userFound);
            }

            const modifiedUser = userFound.update({
                nom: (nom ? nom : user.nom),
                prenom: (prenom ? prenom : user.prenom),
                email: (email ? email : user.email),
                isAdmin: ( isAdmin ? isAdmin : user.isAdmin),
                password: ( password ? password : user.password),

            }).then(function(modifiedUser){
                return res.status(200).json(({'message': 'Le profile a été modifié !'}))
            }).catch(function(err) {
                res.status(500).json({'error': 'Le profile ne peut etre modifié'})
            });

        }).catch(function(err) {
            res.status(500).json({'error': 'user introuvable'})
        });
    },*/
    modifyUser: function(req, res) {
        //  récupération autorisation header
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

            const modifiedUser = userFound.update({
                nom: (nom ? nom : user.nom),
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
    
  /*  deleteUser: function(req, res) {
        //  récupération autorisation header
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);
        // declaration des parametres
        var  userId2 = req.params.id;
        
        console.log(userId2);
        models.User.findOne({
          // attributes: ['id', 'nom', 'prenom', 'email', 'isAdmin'],
            where: { id: userId2}
        })
            if (userId == userId2) {
                    console.log(userId, userId2);
             // return res.status(200).json(userFound);
             //console.log(userFound);
            

                         
            .then(function(userFound) {
                
            }
                return res.status(200).json(({'message': 'Le profile a été supprimé !'}));
           
        
        }else {
            res.status(404).json({'error': 'Le profile ne peut etre supprimé !' });
            console.log(userId, userId2)
        }
           
    }  
    }, */
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
    }
    
} 

        
       
    
    




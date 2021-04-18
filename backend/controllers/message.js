/// importations

const bcrypt = require('bcrypt');
const auth = require('../middleware/jwt-auth');
var models = require('../models');
const message = require('../models/user');
const multer = require('../middleware/multer-config')
const fs = require('fs');
const FormData = require('form-data');
const asynclib = require('async')
module.exports = {
    
    createMessage: function (req, res) {

        //  récupération autorisation
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth); ////    var userId = auth.getUserId();     

        //  paramètres
        const titre = req.body.titre;
        const contenu = req.body.contenu;
        const imageUrl = `${req.protocol}://${req.get('host')}`;    
        
        if (titre == null || contenu == null|| imageUrl == null) {     
            return res.status(400).json({'error': '  un parametre manquant'});
        }
        asynclib.waterfall([
            function(done) {
                models.User.findOne({
                    where: {id: userId}
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({'error': 'unable to verify user'});
                });
            },
            function(userFound, done) {
                if(userFound){
                    models.Message.create({
                        titre : titre,
                        contenu : contenu,
                        imageUrl  : `${req.protocol}://${req.get('host')}/${req.file.filename}`,  
                        UserId: userFound.id  // lien entre le user et le message créé
                    })
                    .then(function(newMessage){
                        done(newMessage);
                    });
                } else {
                    res.status(404).json({'error': 'user not found'});
                }
            },
            ], function(newMessage) {
                if (newMessage) {
                    return res.status(201).json(newMessage);
                } else {
                    return res.status(500).json({'error': 'cannot post message'})
                }
            });
            
            
       /* var userFound = models.User.findOne({
            where: { id: userId }
        })  
        .then(function(userFound){
            console.log(userFound);   
            if (userFound) {         
                const newMessage = models.Message.create( {
                    titre: titre,
                    contenu: contenu,
                    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`,  
                    UserId: userFound.id  // lien entre le user et le message créé
                })
                .then(function(newMessage) {
                    if (newMessage) {
                        return res.status(201).json(newMessage);
                    }else {
                        return res.status(500).json({'error': 'le message ne peut etre créé !'});
                    }
                })
            }else {
                return res.status(500).json({'error': 'user non trouvé'}); 
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'vérification user impossibe'});
            })*/
},
    listeMessages: function (req, res) {
        var fields = req.query.fields;  // selectionner les colonnes souhaitées
       // var limit = parseInt(req.query.limit); // recupérer les messages par nb de lignes limité
       // var offset = parseInt(req.query.offset);
        var order = req.query.order;  //  ordre d'affichage des messages
        models.Message.findAll({
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
          //  limit: (!isNaN(limit)) ? limit : null,
           // offset: (!isNAN(offset)) ? offset : null,
            order: [(order != null) ? order.split(':') : ['titre', 'ASC']],
            include: [{    
                model: models.User,
                attributes: ['nom', 'prenom']  // infos affichés avec le message
            }]
        }).then(function(messages){
            if (messages) {
                res.status(200).json(messages);
            }else {
                res.status(404).json({'error': 'aucun message trouvé !'});
            }
        }).catch(function(err){
            res.status(500).json({'error' : 'champs invalides'})
        })
    },

    modifyMessage: function(req, res) {
        //  récupération autorisation header
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);

        // declaration des parametres
        
        const titre = req.body.titre;
        const contenu = req.body.contenu;
        const imageUrl = req.imageUrl;

        models.Message.findOne({
            attributes: ['id','titre', 'contenu', 'imageUrl'],
            where: { id: userId}

       /* models.Message.findOne({
            attributes: ['id', 'titre', 'contenu', 'imageUrl'],
            where: { id: id}*/
        }).then(function(messageFound) {
            const modifiedMessage = messageFound.update({
                titre: ( titre ?  titre : message.titre),
                contenu: (contenu ? contenu : message.contenu),
                imageUrl: (imageUrl ? imageUrl : message.imageUrl),
            }).then(function(modifiedMessage){
                return res.status(200).json(({'message': 'Le message a été modifié !'}))
            }).catch(function(err) {
                res.status(500).json({'error': 'Le message ne peut etre modifié'})
            });
        }).catch(function(err) {
            res.status(500).json({'error': 'message introuvable'})
        });
    },
    deleteMessage: function(req, res) {
        //  récupération autorisation header
        var headerAuth = req.headers ['authorization'];
          var userId = auth.getUserId(headerAuth);

        // declaration des parametres
        const titre = this.titre;
        const contenu = this.contenu;
        const imageUrl = this.imageUrl;
        const id = this.messageId;
       // const idToDelete = req.params.id;
        models.Message.findOne({
            attributes: ['id','titre', 'contenu', 'imageUrl'],
            where: { id: id}
        }).then(function(messageFound) {
           console.log(messageFound);
            const deletedMessage = messageFound.delete({
            }).then(function(deletedMessage){
                return res.status(200).json(({'message': 'Le message a été supprimé !'}))
            }).catch(function(err) {
                res.status(500).json({'error': 'Le message ne peut etre supprimé !'})
            });
        }).catch(function(err) {
            res.status(500).json({'error': 'message introuvable'})
        });
    }
}
/// importations

const bcrypt = require('bcrypt');
const auth = require('../middleware/jwt-auth');
var models = require('../models');
const message = require('../models/user');
const multer = require('../middleware/multer-config')
const fs = require('fs');
const FormData = require('form-data');
var moment = require('moment');

moment().format('LLL'); 
module.exports = {
    createMessage: function (req, res, next) {
        //  récupération autorisation
        var headerAuth = req.headers ['authorization'];
        var {userId} = auth.getUserId(headerAuth); ////    var userId = auth.getUserId();  
        var {isAdmin} = auth.getUserId(headerAuth);   
        //  paramètres
        const message = [    
        titre = req.body.titre,
        contenu = req.body.contenu,
        imageUrl = req.file && `${req.protocol}://${req.get('host')}`  
        ]   
        if (titre == null || contenu == null) {        //// || imageUrl == null
            return res.status(400).json({'error': '  un parametre manquant'});
        }
        var userFound = models.User.findOne({
            where: { id: userId }
        })  
        .then(function(userFound){
            console.log(userFound);   
            if (userFound) {         
                const newMessage = models.Message.create( {
                    titre: titre,
                    contenu: contenu,
                    imageUrl:  req.file && `${req.protocol}://${req.get('host')}/${req.file?.filename}`,  //   req.file &&
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
            console.log(err);
            return res.status(500).json({'error': 'vérification user impossibe'});
            })
        },
/////////////////////////////////////////////////////////////
    listeMessages: function (req, res) {
        var fields = req.query.fields;  // selectionner les colonnes souhaitées
        var order = req.query.order;  //  ordre d'affichage des messages

        /// récupération de tous les messages
        models.Message.findAll({
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            order: [(order != null) ? order.split(':') : ['titre', 'ASC']],
            include: [{    
                model: models.User,
                attributes: ['nom', 'prenom']  // infos du user affichés avec le message
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
    /////////////////////////////////////////////////////

    DetailsMessage: function(req, res) {
        //  récupération autorisation header
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);
        // determination du message à supprimer

        var messageId = req.params.id ;
             console.log(messageId);
        models.Message.findOne({
            where: { id: messageId} , 
            include: [{    
                model: models.User,
                attributes: ['id'],
            }]
        }).then(function(message) {
            if (message) {
                res.status(200).json(message);
            }else {
                res.status(404).json({'error': 'aucun message trouvé !'});
            }
        }).catch(function(error) {
            res.status(500).json({'error': 'message introuvable'})
        });
    },
    /////////////////////////////////////////
    modifyMessage: function(req, res) {
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);
     // determination du message à modifier
           const messageId = req.params.id ;
           const titre = req.body.titre;
           const contenu = req.body.contenu;
           const imageUrl = req.body.imageUrl;
            console.log(messageId);
      models.Message.findOne ({
        attributes: [ 'id', 'titre', 'contenu', 'imageUrl'],
        where: {id: messageId}, 
        include: [{    
            model: models.User,
            attributes: ['id'],
            where: { id: userId},
        }], 
        }).then(function(messageFound) {
            const modifiedMessage = messageFound.update({
                titre: ( titre ?  titre : message.titre),
                contenu: (contenu ? contenu : message.contenu),
                imageUrl: (imageUrl ? imageUrl : message.imageUrl),
            }).then(function(modifiedMessage){
                return res.status(200).json(modifiedMessage)
            }).catch(function(err) {
                res.status(500).json({'error': 'Le message ne peut etre modifié'})
            });
        }).catch(function(err) {
            res.status(500).json({'error': 'message introuvable'})
        });
    },
    ///////////////////////////////////////////////////
    deleteMessage: function(req, res) {
        //  récupération autorisation header
        var headerAuth = req.headers ['authorization'];
        var {userId} = auth.getUserId(headerAuth);
       // determination du message à modifier
        var messageId = req.params.id ;
        console.log(messageId);
       // Récupération du message à supprimer
        models.Message.findOne ({     
            where: {id: messageId}, 
            include: [{    //  lien Message/User
               model: models.User,
               where: { id: userId},
            }]                      
            }).then(function(messageFound) {
                const deletedMessage = messageFound.destroy({
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
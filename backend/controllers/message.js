/// importations

const bcrypt = require('bcrypt');
const auth = require('../middleware/jwt.auth');
var models = require('../models');
const message = require('../models/user');
const multer = require('../middleware/multer-config')
const fs = require('fs');
const FormData = require('form-data');

module.exports = {
    createMessage: function (req, res) {

        //  récupération autorisation
        var headerAuth = req.headers ['authorization'];
        var userId = auth.getUserId(headerAuth);

        //  paramètres
        const titre = req.body.titre;
        const contenu = req.body.contenu;
        const imageUrl = `${req.protocol}://${req.get('host')}`;    
        
        if (titre == null || contenu == null|| imageUrl == null) {     
            return res.status(400).json({'error': '  un parametre manquant'});
        }
        var userFound = models.User.findOne({
            attributes: ['id'],
            where: { id: userId },
        })  
        .then(function(userFound){
            console.log(userFound);   
            if (userFound) {         
                const newMessage = models.Message.create( {
                    titre: titre,
                    contenu: contenu,
                    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`,  
                    UserId: userFound.id 
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
            })
},
    listeMessages: function (req, res) {
        const fields = req.query.fields;  // selectionner les colonnes souhaitées
      //  const limit = parseInt(req.quey.limit); // recupérer les messages par nb de lignes limité
       // const offset = parseInt(req.quey.offset);
        const order = req.query.order;  //  ordre d'affichage des messages
        models.Message.findAll({
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            //limit: (!isNaN(limit)) ? limit : 5,
           // offset: (!isNAN(offset)) ? offset : 5,
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
        const idToModify = (req.params.id);

        models.Message.findOne({
            attributes: ['id','titre', 'contenu', 'imageUrl'],
            where: { id: idToModify}

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
        
        const idToDelete = req.params.id;
        models.Message.findOne({
            attributes: ['id','titre', 'contenu', 'imageUrl'],
            where: { id: idToDelete}
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
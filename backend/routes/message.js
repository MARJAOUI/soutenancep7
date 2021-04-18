//  imprtations
const express = require('express');
const messagesCtrl = require('../controllers/message');
const multer = require('../middleware/multer-config');

// router

exports.router = (function() {
    const messageRouter = express.Router();

// messages routes
messageRouter.route('/messages/create/').post( multer, messagesCtrl.createMessage);
messageRouter.route('/messages/modify/:id').put( multer, messagesCtrl.modifyMessage);
messageRouter.route('/messages/delete/:id').delete( multer, messagesCtrl.deleteMessage);
messageRouter.route('/messages/display/').get(multer, messagesCtrl.listeMessages);

return messageRouter;
})();
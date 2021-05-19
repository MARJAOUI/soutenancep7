//  importations
const express = require('express');
const usersCtrl = require('../controllers/user');


// router

exports.router = (function() {
    const userRouter = express.Router();
// Users routes
    userRouter.route('/users/signup/').post(usersCtrl.signup);
    userRouter.route('/users/login/').post(usersCtrl.login);
    userRouter.route('/users/me/:id').get(usersCtrl.detailsUser);
    userRouter.route('/users/display/').get(usersCtrl.listeUsers);
    userRouter.route('/users/modify/:id').put(usersCtrl.modifyUser);
    userRouter.route('/users/delete/:id').delete(usersCtrl.deleteUser);
            
    return userRouter;
})();
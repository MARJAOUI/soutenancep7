const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a11aan';

//  fonctions exportées
module.exports = {
    // geration du token
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,   // parametre nécessaire
            isAdmin: userData.isAdmin, // parametre nécessaire
        },
        JWT_SIGN_SECRET, {  //  Signature du Token à l'aide de la  constante
            expiresIn: '24h' //  durée de validité du token
        })
    },
    parseAuthorization: function(authorization){
       if (authorization != null) {  
            return   authorization.split(' ')[1] // récupération authorisation sans Bearer et l'esapce suivant
    } 
    },
    getUserId: function(authorization){
        var userId = -1;  // démarrer la requete sur id inexistant
        var isAdmin = 0;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try {
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET); // verification du token
                if(jwtToken != null)
                 userId = jwtToken.userId;//  récuperation de l'id generé ligne 11
                 isAdmin = jwtToken.isAdmin;
            } catch(err) {}
        }
             return {userId, isAdmin};
    }
}
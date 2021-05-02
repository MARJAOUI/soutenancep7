const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a11aan';

//  fonctions exportées
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,
        },
        JWT_SIGN_SECRET, {
            expiresIn: '24h'
        })
    },
    parseAuthorization: function(authorization){
       // return (authorization != null) ? authorization.replace('Bearer ', '') : null; 
       if (authorization != null) {  
        return   authorization.split(' ')[1]
    } 
    },
    //extractToken: function(req) {
     //   return req.headers.authorization.split(' ')[1];   ////  const token = req.headers.authorization.split(' ')[1];
   // },
    getUserId: function(authorization){
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try {
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                    userId = jwtToken.userId;
            } catch(err) {}
        }
        return userId;
    }
}
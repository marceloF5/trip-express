
var jwt = require('jwt-simple')
  , secret = 'mySecretToken'
  , moment = require('moment');
  

module.exports = function (req, res, next) {
     
    var token = req.headers["authorization"];
    var userId = req.headers["user"];
    var expires = req.headers["expires"];

    // DESCRIPTOGRAFAR USER ID

    if (token) {        
        try {                

            var decoded = jwt.decode(token, secret);  
            if (decoded.iss != userId) {
                res.json(498, {error: 'Acesso Expirado. Token inválido!'});
            }
            
            if (expires <= Date.now()) {
                res.json(498, {error: 'Acesso Expirado. Token inválido!'});                                            
            } else {    
                return next();                                         
            }
            
        } catch (err) {
            return res.status(401).json({message: 'Token não autorizado!'});
        }
    } else {
        res.json(401, {message: 'Token não autorizado!'})
    }
};
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //récupération
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //décodage
        const userId = decodedToken.userId; //vérification
        console.log('middleware/auth.js : token : userId : ' + userId + ' (request userId was : ' + req.body.userId + ')')
        if (req.body.userId && req.body.userId != userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    }
    catch (error){
        console.log(error)
        res.status(401).json({error: new Error('Invalid request!')});
    }
};
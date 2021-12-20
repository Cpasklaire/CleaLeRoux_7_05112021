const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//require('dotenv').config();

const db = require('../models/index');

// POST
//Créé un user
exports.signup = (req, res, next) => {
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let password = req.body.password;
    //Champs complet
    if(lastName == null || lastName == '' || firstName == null || firstName == ''|| email == null || email == '' ||  password == null || password == '') {
        return res.status(400).json({ error: 'Merci de remplire tous les champs' });
    }
    //Existence de l'user
    db.User.findOne({
        attributes: ['lastName'|| 'firstName' || 'email'],
        where: {
            lastName: lastName,
            firstName: firstName,
            email: email
        }
    })
    .then(userExist => {
        if(!userExist) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = db.User.build({
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    email: req.body.email,
                    password: hash,
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Votre compte créé' }))
                    .catch(error => {
                        console.log(error)
                        res.status(400).json({ error: 'Création du compte échoué' })
                    });
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: 'Création du compte échoué' })
            });
        } else {
            console.log(error)
            return res.status(404).json({ error: 'Vous étes déjà inscrit' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Création du compte échoué' })
    });
};

//Se connecter
exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                // TODO : utiliser ...user
                // let res = ...user
                // puis user.token =
                res.status(200).json({
                    userId: user.id,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    statut: user.statut,
                    avatar: user.avatar,
                    description: user.description,
                    token: jwt.sign(
                        {userId: user.id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '1h'}
                    )
                });
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: 'Connection échoué' })
            });
        } else {
            return res.status(404).json({ error: 'Vous n\'avez pas encore créé de compte' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Connection échoué' })
    });
}

//GET
// Se voir
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: [ 'id', 'lastName', 'firstName', 'email', 'description', 'avatar', 'statut', 'createdAt', 'lastRefreshDate' ],
        where: { id: id }
    })
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(404).json({ error: 'Utilisateur non trouvé' })
    });
}

//PUT
// Se Modifier
exports.modifyUserProfile = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.body.user = userId
    // console.log(typeof req.body)
    // console.log(req.body)
    let userObject = {
        ...req.body
    };

    // Password (with hash)
    if (userObject.password) {
        console.log("password change for user " + userId)
        userObject.password = await bcrypt.hash(userObject.password, 10)
    }
    
    //Avatar        
    if (req.file) {
        console.log("avatar change for user " + userId)
        userObject.avatar = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    console.log(userObject);
    

    db.User.findOne({
        where: { id: userId },
    })
    .then(userFound => {    
        if(userFound) {          
            db.User.update(userObject, {
                where: { id: userId},
            })
            .then(() => res.status(200).json({ message: 'Profil mis à jour' }))
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Modification du profil échoué' })
            })
        }
        else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Modification du profil échoué' })
    });
}

// DELETE
// Suppression de l'user
exports.deleteAccount = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
    .then(user => {
        if(user) {
            db.User.destroy({
                where: { id: id }
            })
            .then(() => res.status(200).json({ message: 'Compte supprimé' }))
            .catch(() => res.status(500).json({ error: 'Suppression du profil échoué' }));

        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Suppression du profil échoué' })
    });
}


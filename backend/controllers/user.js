const jwt = require('jsonwebtoken');//application token
const bcrypt = require('bcrypt'); //application bcrypt

const User = require('../models/user');

/*POST*/

/* Créé un user '/signup' */
exports.signup = async (req, res, next) => {
    let usermail = await User.findOne({email: req.body.email});
        if(!usermail)
        {
            bcrypt.hash(req.body.password, 10) //« saler » le mot de passe + 10
                .then(hash => {
                    const user = new User({
                    email: req.body.email,
                    password: hash
                    });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                    .catch(error => res.status(401).json({ error}));
                })
        }    
        else
        {
            return res.status(422).json({ message : "Adresse mail déja utilisée" })
        }};

/* Connection d'un user '/login' */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(//nouveau token
                        { userId: user._id },//contient ID encodées dans le token
                        'RANDOM_TOKEN_SECRET',// encoder avec la clef "RANDOM_TOKEN_SECRET"
                        { expiresIn: '24h' }//durée de validité
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
  };

/*GET*/
/* Voir tous les users '/' */
exports.getAllUsers = (req, res, next) => {
    User.find()
        .then((posts) => {res.status(200).json(posts);})
        .catch((error) => {res.status(400).json({error: error});});
};
/* Voir son profil '/:id' */
exports.getOneUser = (req, res, next) => {
    User.findOne({ 
        _id: req.params.id
    })
        .then((post) => {res.status(200).json(post);})
        .catch((error) => {res.status(404).json({error: error});});
};
/* Voir les modérateurs,RH '/:role' */
exports.getOneUser = (req, res, next) => {
    User.findOne({ 
        role: req.params.role,
        role = modo
    })
        .then((post) => {res.status(200).json(post);})
        .catch((error) => {res.status(404).json({error: error});});
};
/*PUT*/
/* Modifier un profil '/:id' */
exports.modifyUser = (req, res, next) => {
    const userObject = req.file ?
    {
        ...JSON.parse(req.body.user),
        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'User modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

/*DELECTE*/
/* Supprimer un profil '/:id' */
exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(post => 
        {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => //fonction unlink du package fs pour supprimer
            { 
                User.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'User supprimé'}))           
                    .catch(error => res.status(400).json({ error }));
            });
        })
            .catch(error => res.status(500).json({ error }));
};
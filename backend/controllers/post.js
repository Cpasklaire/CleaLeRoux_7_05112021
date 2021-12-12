const jwt = require("jsonwebtoken");
const db = require('../models/index');
const fs = require('fs');

// POST
//Créé un post
exports.createPost = (req, res, next) => {   
    const text = req.body.text;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log(1);
    
    if (text == null || text == '' && imageURL == null) {console.log(2);
        return res.status(400).json({ error: 'Ecrivez ou mettez une image' });
    } 
    console.log(3);
    db.User.findOne({
        where: { id: userId }
    })
    .then(userFound => {
        if(userFound) {console.log(userFound);
            const post = db.Post.build({
                text: req.body.text,
                imageURL: req.file ? `${req.protocol}://${req.get('host')}/images/postIMG/${req.file.filename}`: req.body.imageURL,
                UserId: userFound.Users.dataValues.id
            })
            post.save()
            .then(() => res.status(201).json({ message: 'Message créé !' }, ))
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Création du message échoué' })
            });
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Création du message échoué' })
    });
};

//GET
// Voir tout les message
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [['createdAt', "DESC"]] , //ordre date descendant
        include: [{
            model: db.User,
            attributes: [ 'lastName', 'firstName', 'avatar' ]
        },{
            model: db.Commentaire
        }]
    })
    .then(postFound => {
        if(postFound) {
            res.status(200).json(postFound);
        } else {
            res.status(404).json({ error: 'Aucun message publié :(' });
        }
    })
    .catch(error => {
        res.status(500).send({ error: 'Recherche des messages échoué' });
    });
}

//PUT
// Modifier un message
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
    text: req.body.text,
    imageURL: `${req.protocol}://${req.get('host')}/images/postIMG/${req.file.filename}`
    } : { ...req.body };
    db.Post.findOne({
        where: {  id: req.params.postId },
    })
    .then(postFound => {
        if(postFound) {
            db.Post.update(postObject, {
                where: { id: req.params.postId}
            })
            .then(post => res.status(200).json({ message: 'Message modifié' }))
            .catch(error => res.status(400).json({ error: 'Modification du message échoué' }))
        }
        else {
            res.status(404).json({ error: 'Aucun message trouvé :(' });
        }
    })
    .catch(error => res.status(500).json({ error: 'Modification du message échoué' }));
}

//DELETE
// Supprimer un message
exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id'],
        where: { id: req.params.postId }
    })
    .then(post => {
        if(post) {
            if(post.imageURL != null) {
                const filename = post.imageURL.split('/images/postIMG/')[1];
            
                fs.unlink(`images/postIMG/${filename}`, () => {
                    db.Post.destroy({ 
                        where: { id: req.params.postId } 
                    })
                    .then(() => res.status(200).json({ message: 'Message supprimé' }))
                    .catch(() => res.status(500).json({ error: 'Suppression du message échoué' }));
                })
            } else {
                db.Post.destroy({ 
                    where: { id: req.params.postId } 
                })
                .then(() => res.status(200).json({ message: 'Message supprimé' }))
                .catch(() => res.status(500).json({ error: 'Suppression du message échoué' }));
            }
        } else {
            return res.status(404).json({ error: 'Aucun message trouvé :('})
        }
    })
    .catch(error => res.status(500).json({ error: 'Suppression du message échoué' }));
}




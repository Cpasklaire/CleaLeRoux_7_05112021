const jwt = require("jsonwebtoken");
const db = require('../models/index');

// POST
// Créer un commentaire
exports.createCommentaire = (req, res, next) => {    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    
    db.Post.findOne({
        where: { id: req.params.postId }
    })
    .then(postFound => {
        if(postFound) {
            const commentaire = db.Commentaires.build({
                text: req.body.text,
                postId: postFound.id,
                userId: userId
            })
            commentaire.save()
                .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
                .catch(error => res.status(400).json({ error: 'Création du Commentaire échoué' }));
        } else {
            return res.status(404).json({ error: 'Aucun message publié :('})
        }
    })
    .catch(error => res.status(500).json({ error: 'Création du Commentaire échoué' }));
}

//GET
// Voir les commentaires
exports.getAllCommentaires = (req, res, next) => {
    db.Commentaire.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.User,
            attributes: [ 'lastName', 'firstName', 'avatar' ]
        }]
    })
    .then(commentaireFound => {
        if(commentaireFound) {
            res.status(200).json(commentaireFound);
            console.log(commentaireFound);
        } else {
            res.status(404).json({ error: 'Aucun commentaire publié :(' });
        }
    })
    .catch(error => {
        res.status(500).send({ error: 'Recherche du commentaire échoué' });
    });
}

//DELETE
// Supprimer un commentaire
exports.deleteCommentaire = (req, res, next) => {
    db.Commentaire.findOne({
        attributes: ['id'],
        where: { id: req.params.commentaireId }
    })
    .then(commentaireFound => {
        if(commentaireFound) {
            db.Commentaire.destroy({ 
                where: { id: req.params.commentaireId } 
            })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
            .catch(() => res.status(500).json({ error: 'Suppression du commentaire échoué' }));
            
        } else {
            return res.status(404).json({ error: 'Aucun commentaire publié :('})
        }
    })
    .catch(error => res.status(500).json({ error: 'Suppression du commentaire échoué' }));
}

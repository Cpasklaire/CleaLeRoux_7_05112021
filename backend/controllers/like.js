const jwt = require("jsonwebtoken");
const db = require('../models/index');

// POST
// Liker
exports.likePost = (req, res, next) => {
    //recupéré userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const liked = req.body.like

    db.Post.findOne({
        where: { id: req.params.postId },
    })
    .then(postfound => {
        if(!postfound) {
            return res.status(404).json({ error: 'Aucun message trouvé :(' })
        } 
        else {
            db.Like.findOne({
                attributes: ['userId'],
                where: { 
                    postId: req.params.postId,
                    userId: userId
                },
            })
            .then(userExist => {
                if(!userExist) {
                    db.Like.create({
                        postId: req.params.postId,
                        userId: userId
                    })
                    .then(() => {
                        db.Post.update({
                            likes: postfound.likes +1
                        },{
                            where: { id: req.params.postId }
                        })
                        .then(() => res.status(201).json({ message: 'Message liker' }))
                        .catch(error => {
                            console.log(error)
                            res.status(500).json({ error: '1Like échoué' })
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(400).json({ error: '2Like échoué' })
                    })
                } else {
                    db.Like.destroy({
                        where: {
                            postId: req.params.postId,
                            userId: userId
                        }
                    })
                    .then(() => {
                        db.Post.update({
                            likes: postfound.likes -1
                        },{
                            where: { id: req.params.postId }
                        })
                        .then(() => res.status(201).json({ message: 'Message dé-liker' }))
                        .catch(error => {
                            console.log(error)
                            res.status(500).json({ error: 'Dé-like échoué' })
                        })
                    })
                }
            })
        }
    })
    .catch(error => {
        consol.log(error)
        res.status(400).json({ error: 'Like ou dé-like échoué' })
    })
}

//GET
// Voir les likes d'un message
exports.getAllLike = (req, res, next) => {
    db.Like.findAll({
        where: { postId: req.params.postId},
        include: {
            model: db.User,
            attributes: ['lastName', 'firstName'],
            as: 'User'
        },
    })
    .then(likePostFound => {
        if(likePostFound) {
            res.status(200).json(likePostFound);
        } else {
            res.status(404).json({ error: 'Ce message n\'a pas été liker' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Recherche de like échoué' })
    })
}
const Like = require('../models/like');

/*POST*/
/* Faire un like '/' */
exports.createLike = (req, res, next) => {
    const likeObject = JSON.parse(req.body.like);
    delete likeObject._id;
    const like = new Like({
        ...likeObject,
    });
    like.save()
        .then(() => res.status(201).json({ message: 'Like créé'}))
        .catch(error => res.status(400).json({ error }));
};

/*GET*/
/* Voir les likes d'un post '/:likeId'*/
exports.getAllLikes = (req, res, next) => {
    Like.find()
        .then((likes) => {res.status(200).json(likes);})
        .catch((error) => {res.status(400).json({error: error});});
};

/*DELECTE*/
/* Supprimer un like '/:id' */
exports.deleteLike = (req, res, next) => {
    Like.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Like supprimé'}))           
        .catch(error => res.status(400).json({ error }));
};
const fs = require('fs'); //application pour modifier système de fichiers

const Post = require('../models/post');

/*POST*/
/* Créé une publication '/' */
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject, //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //http://host/chemin l'image
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post créé'}))
        .catch(error => res.status(400).json({ error }));
};

/*GET*/
/* Voir toutes les publications '/' */
exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => {res.status(200).json(posts);})
        .catch((error) => {res.status(400).json({error: error});});
};
/* Voir une publication '/:id' */
exports.getOnePost = (req, res, next) => {
    Post.findOne({ //recherche dans le modéle post
        _id: req.params.id
    })
        .then((post) => {res.status(200).json(post);})
        .catch((error) => {res.status(404).json({error: error});});
};
/* Voir les publications non lu '/:createDate' */
/* Voir les publications sans images'/:message' */
/* Voir les publications avec images '/:imageURL' */
/* Voir les publications d'un user '/:userId' */

/*PUT*/
/* Modifier une publication /:id' */
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

/*DELECTE*/
/* Supprimer une publication '/:id' */
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => 
        {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => //fonction unlink du package fs pour supprimer
            { 
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post supprimé'}))           
                    .catch(error => res.status(400).json({ error }));
            });
        })
            .catch(error => res.status(500).json({ error }));
};
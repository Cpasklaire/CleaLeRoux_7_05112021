const fs = require('fs'); //application pour modifier système de fichiers

const Publication = require('../models/publication');

/*POST /api/publications Création publication*/
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.publication);
    delete sauceObject._id;
    const publication = new Publication({
        ...sauceObject, //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //http://host/chemin l'image
        likes: 0, //non donné par le front
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    publication.save()
        .then(() => res.status(201).json({ message: 'Publication créé'}))
        .catch(error => res.status(400).json({ error }));
};

/*GET /api/publications/:id Renvoie la publication avec l’_id fourni.*/
exports.getOneSauce = (req, res, next) => {
    Publication.findOne({ //recherche dans le modéle publication
        _id: req.params.id
    })
        .then((publication) => {res.status(200).json(publication);})
        .catch((error) => {res.status(404).json({error: error});});
};

/*PUT /api/publications/:id Met à jour la publication avec l'_id fourni.*/
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Publication.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Publication modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

/*DELETE /api/publications/:id Supprime la publication avec l'_id fourni.*/
exports.deleteSauce = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
        .then(publication => 
        {
            const filename = publication.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => //fonction unlink du package fs pour supprimer
            { 
                Publication.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Publication supprimé'}))           
                    .catch(error => res.status(400).json({ error }));
            });
        })
            .catch(error => res.status(500).json({ error }));
};

/*GET /api/publications Renvoie un tableau de toutes les publications de la base de données.*/
exports.getAllSauces = (req, res, next) => {
    Publication.find()
        .then((publications) => {res.status(200).json(publications);})
        .catch((error) => {res.status(400).json({error: error});});
};

/*POST like*/
exports.likeSauce = async (req, res, next) => {
    let publication = await Publication.findOne({ _id: req.params.id });
    if (!publication) 
    { 
        res.status(404).json({ message : "pas de publication" })
        return
    }
    switch (req.body.like)
    {        
        case 1: //like
            if (!publication.usersLiked.includes(req.body.userId) && !publication.usersDisliked.includes(req.body.userId))
            {
                publication.likes += 1
                publication.usersDisliked.push(req.body.userId)
                await publication.save()
                    .then(() => res.status(201).json({ message: "like" }))
                    .catch(error => res.status(400).json({ error }));     
            }
            else
            {
                res.status(418).json({ message: 'vous avez déja liker avec une théiére' });
            }
        break;

        case -1: //dislike
            if (!publication.usersLiked.includes(req.body.userId) && !publication.usersDisliked.includes(req.body.userId))
            {
                publication.dislikes += 1
                publication.usersDisliked.push(req.body.userId)
                await publication.save()
                    .then(() => res.status(201).json({ message: "dislike" }))
                    .catch(error => res.status(400).json({ error }));     
            }
            else
            {
                res.status(400).json({ message: 'vous avez déja disliker' });
            }
        break;

        case 0: //neutre
            if (!publication.usersLiked.includes(req.body.userId) && !publication.usersDisliked.includes(req.body.userId))
            { 
                res.status(400).json({ message: "vous n'avez jamais voté" })
                return
            }
            
            //anti like
            if (publication.usersLiked.includes(req.body.userId))
            {
                Publication.updateOne({  _id: req.params.id },
                    {
                        $inc: {likes: -1 }, 
                        $pull: {usersLiked: req.body.userId}
                    })
                        .then(() => res.status(201).json({ message: "anti like" }))
                        .catch(error => res.status(400).json({ error }));     
            }
            
            //anti dislike
            if (publication.usersDisliked.includes(req.body.userId))
            {
                Publication.updateOne({  _id: req.params.id },
                    {
                        $inc: {dislikes: -1 }, 
                        $pull: {usersDisliked: req.body.userId}
                    })
                        .then(() => res.status(201).json({ message: "anti dislike" }))
                        .catch(error => res.status(400).json({ error }));    
            }
        break;
    }
};
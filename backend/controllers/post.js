const fs = require('fs'); //application pour modifier système de fichiers
const db = require('../models');
const Post = db.post;


/*POST*/
/* Créé une publication '/' */
exports.createPost = (req, res) => {
   // Vérification existance idUSERS
   if (!req.body.userId) {
    res.status(400).send({
      message: "Ce contenu ne peut être vide!"
    });
    return;
  }

  // Création du message
  const post = {
    id: req.body.id,
    userId: req.body.userId,
    createDate: req.body.createDate,
    
    imageURL: req.body.imageURL,
    message: req.body.message,
    moderatedDate: req.body.moderatedDate,
    deleteDate: req.body.deleteDate,
    moderatedBy: req.body.moderatedBy,
    parentId: req.body.parentId,
    updateDate: req.body.updateDate
  };

// Sauvegarde message base de donnée
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreure est intervenue lors de la création du message."
      });
    });
};  

/*GET*/
/* Voir toutes les publications '/' */
exports.getAllPosts = (req, res) => {
    Post.findAll({
        attributes: ['userId', 'message', 'imageURL', 'createDate']
      })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreure est intervenue."
          });
        });
    };


/* Voir une publication '/:id' */
exports.getOnePost = (req, res) => {
    const id = req.params.id;
    Post.findOne({
      where: {id: id},
      attributes: ['userId', 'message', 'imageURL', 'createDate']
  })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Impossible de trouver le message = "+ id 
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de récupérer le message = " + id + ", pour le moment."
        });
      });
  };


/*PUT*/
/* Modifier une publication /:id' */
exports.modifyPost = (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  Post.update(req.body, {
    where: { id: id, userId: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message mise à jour."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour le message=${id}. Veuillez réessayer plus tard!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise a jour du message=" + id
      });
    });
};

/* Supprimer une publication '/:id' */
exports.deletePost = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message supprimé!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer le message=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprime le message=" + id + ". Veuillez réessayer plus tard"
      });
    });
};
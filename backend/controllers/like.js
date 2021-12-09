const db = require('../models');
const post = require('../models/post');
const Like = db.like;

/*POST*/
/* Faire un like '/' */
exports.createLike = (req, res) => {
    const likeObject = JSON.parse(req.body.like);
    delete likeObject._id;
    const like = new Like({
        ...likeObject,
    });
    like.save()
        .then(() => res.status(201).json({ message: 'Like créé'}))
        .catch(error => res.status(400).json({ error }));
};

/*DELETE*/
/* Supprimer un like '/:id' */
exports.deleteLike = (req, res) => {
  Like.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Like supprimé'}))           
      .catch(error => res.status(400).json({ error }));
};


/*GET*/
/* Voir les likes d'un post */
exports.getOneLikePost = (req, res) => {
  const postId = req.params.postId;
  Like.findAll({
      where: {postId : postId},
      attributes: ['userId', 'postId', 'like', 'likeDate']
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

  /* Voir les likes d'un user */
  exports.getOneLikeUser = (req, res) => {
    const userId = req.params.userId;
    Like.findAll({
        where: {userId : userId},
        attributes: ['userId', 'postId', 'like', 'likeDate']
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


const jwt = require('jsonwebtoken');//application token
const bcrypt = require('bcrypt'); //application bcrypt
const db = require('../models');
const user = require('../models/user');
const User = db.user;


/*POST*/

/* Créé un user '/signup'*/
exports.signup = (req, res) => {
  // Vérification existance USERS

  if (req.body.email != User.email) {
    bcrypt.hash(req.body.password, 10) //« saler » le mot de passe + 10

      const user = {

          id: req.params.id,
          email: req.body.email,
          password:  req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          avatar: req.body.avatar,
          description: req.body.description,
          createAd: req.params.createAt,
          updateAt: req.params.updatedAt,
          lastRefreshDate: req.params.lastRefreshDate
         };
           User.create(user)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Une erreure est intervenue lors de la création de l'utilisateur."
     });
   });
 } else{
  res.status(401).send({
      message:
        err.message || "Adresse email déjà utilisée !"
    });
 }};

/* Connection d'un user '/login' */
exports.login = (req, res) => {
    User.findOne({ 
      where:{ email: req.body.email },
      attributes: ['email'],
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                /*
                res.status(200).json({
                    userId: user.userId,
                    token: jwt.sign(//nouveau token
                        { userId: user.userId },//contient ID encodées dans le token
                        'RANDOM_TOKEN_SECRET',// encoder avec la clef "RANDOM_TOKEN_SECRET"
                        { expiresIn: '24h' }//durée de validité
                    )
                });
                */
            })
            .catch(error => res.status(500).json({ error }));
        })
    .catch(error => res.status(500).json({ error }));
  };

/*GET*/
/* Voir tous les users '/' */
exports.getAllUsers = (req, res) => {
  console.log("coucou"),
    User.findAll({
        attributes: ['id', 'lastName', 'firstName', 'email']
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

/* Voir son profil '/:id' */
exports.getOneUser = (req, res) => {
    const id = req.params.id;
    User.findOne({ 
        where: {id: id},
        attributes: ['id', 'lastName', 'firstName', 'email', 'role']
    })
    .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Impossible de trouver l'utilisateur = "+ id 
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de récupérer l'utilisateur = " + id + ", pour le moment."
        });
      });
  };
  
/*PUT*/
/* Modifier un profil '/:id' */
exports.modifyUser = (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
  
    User.update(req.body, {
        where: { id: id, userId: userId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Utilisateur mise à jour."
          });
        } else {
          res.send({
            message: "Impossible de mettre à jour l'utilisateur = " + id +". Veuillez réessayer plus tard!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la mise a jour de l'utilisateur = " + id
        });
      });
  };

/*DELETE*/
/* Supprimer un profil '/:id' */
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Utilisateur supprimé!"
            });
        } else {
            res.send({
            message: "Impossible de supprimer l'utilisateur = " + id
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Impossible de supprimer l'utilisateur = " + id + ". Veuillez réessayer plus tard"
        });
        });
};
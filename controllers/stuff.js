const Thing = require('../models/Thing');
const fs = require('fs'); // package pour interagir avec le systeme de fichiers du serveur

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // http://localhost:3000/images/imageName
  });
  thing.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
  exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {
      ...JSON.parse(req.body.Thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete thingObject._userid;
    Thing.findOne({ _id: req.params._id})
    .then((thing) => {
      if(thing.userId != req.auth.userId){
        res.status(401).json({message: 'Non autorisé!!'});
      } else {
        thing.updateOne({ _id: req.params.id}, {...thingObject, _id: req.params._id})
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch( error => res.status(401).json({error}));
      }
    })
    .catch(error => res.status(400).json( {error} ))
  };
  
  exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id})
    .then( thing => {
      if( thing.userId != req.auth.userId){
          res.status(401).json({ message: 'Non autorisé!'})
      } else {
          const filename = thing.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Things.deleteOne({ _id: req.params.id})          
                     .then( () => { res.status(200).json({ message: 'Objet supprimé !'})})
                     .catch( error => res.status(500).json({error}));
          })
        }
      })
      .catch( error => {
        res.status(500).json({ error });
      }) 
      }
  
exports.getAllStuff = (req, res, next) => {
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
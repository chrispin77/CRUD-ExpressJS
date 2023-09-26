const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://chrispin:MonMotDePasseLoginMongodb@cluster0.uhv8z7y.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connexion à MongoDB réussie!'))
.catch(() => console.log('Connexion à MongoDB échouée!'));


app.use(express.json()); //Pour avoir accès au body des requetes envoyés par l'application et les recevoir sous forme json

//Creation d'un middleware pour gerer les erreur de Crossing Origin Resource Sharing (CORS)
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // L'origine qui a le droit d'accès à notre APi s'est tout le monde 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //On autorise l'utilisation de quelques headers sur l'objet reponse
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // On autorise l'utilisation de quelques verbes HTTP
    next();
});

app.use('/api/stuff', stuffRoutes); // on enregistre notre router stuffRoutes pour toutes les demandes vers /api/stuff
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
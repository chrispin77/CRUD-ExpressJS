const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then( ()=> res.status('201').json({message :'Utilisateur céée !'}))
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user == null) {
            res.status(401).json( {message: 'identifiant ou mot de passe incorrecte'} );
        } else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    res.status(401).json( {message: 'identifiant ou mot de passe incorrecte'} )
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id}, //Payload(données encodée dans le token)
                            'RANDOM_TOKEN_SECRET', // clé secrete pour chiffré le token
                            { expiresIn: '24h' }
                            )
                    });
                }
            })
            .catch(error => {
                res.status(500).json ( {error} )
            });
        }
    })
    .catch(error => {
        res.status(500).json( {error} );
    })
};
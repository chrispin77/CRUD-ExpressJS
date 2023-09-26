const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({  // Schema() permet de créer un schéma ou modèle de données pour notre base de données MongoDB
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema); //model() permet de rendre le modèle thingSchema utilisable
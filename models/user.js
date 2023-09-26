const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //Package de validation pour les erreurs MongoDB

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});
const User = module.exports = mongoose.model('user', userSchema );

module.exports.regiester = (user_obj, callback) => {
    user_obj.save(callback);
}

module.exports.signin = (email, callback) =>{
    User.findOne({ "email": email }).exec(callback);
}
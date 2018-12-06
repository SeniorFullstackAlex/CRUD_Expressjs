const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    schoolNo: {
        type: Number
    },
    name: {
        type: String
    }
});

const School = module.exports = mongoose.model('school', schoolSchema);
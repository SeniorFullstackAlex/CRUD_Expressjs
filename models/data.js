const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name: {
        type: String
    },
    year: {
        type: Number
    },
    month: {
        type: Number
    },
    week: {
        type: Number
    },
    eleuro: {
        type: Number
    },
    elkwh: {
        type: Number
    },
    heateuro:{
        type: Number
    },
    heatkwh: {
        type: Number
    },
    watereuro: {
        type: Number
    },
    waterlitre: {
        type: Number
    }
});

const Data = module.exports = mongoose.model('data', dataSchema);
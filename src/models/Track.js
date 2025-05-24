const mongoose = require('mongoose');
const { Schema } = moogose;
const trackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    trackUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imgUrl:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Track', trackSchema);
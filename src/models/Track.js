import mongoose from 'mongoose';
const { Schema } = mongoose;
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
    uploader:{
        type: Schema.Types.ObjectId,
        ref: 'User',
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
export default mongoose.model('Track', trackSchema);
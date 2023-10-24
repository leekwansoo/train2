const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const trainItemSchema = new mongoose.Schema(
    {
    name: { 
        type: String, 
        required: true },
    description: {
        type: String, 
        required: true },
    image: {
        type: String, 
        required: false },
    }
);

const TrainItem = mongoose.model('TrainItem', trainItemSchema)

module.exports = TrainItem;
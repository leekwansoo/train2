const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const trainSchema = new mongoose.Schema(
    {  
        user: {
            type: String,
            required: true,
            },
        pushup: {
            type: Number,
            required: false,
            },        
        stomach: {
            type: Number,
            required : false,
        },

        squat: {
            type: Number,
            required : false,
        },
        arm: {
            type: Number,
            required : false,
        },

        uplift: {
            type: Number,
            required : false,
        },
        upheel: {
            type: Number,
            required : false,
        },

        kick_on_chair: {
            type: Number,
            required : false,
        },
        spreading_thigh: {
            type: Number,
            required : false,
        },

        date: {
            type: String,
            required : false,
        },
    }  
)

const Train = mongoose.model('Train', trainSchema)

module.exports = Train;
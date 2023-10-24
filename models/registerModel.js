const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const registerSchema = new mongoose.Schema(
    {  
        user: {
        type: String,
        required: true,
        },

        pw: {
            type: String,
            required : true,
        },
        email: {
            type: String,
            required : true,
        },
        trainItems: {
            type: Array,
            required : false,
        },
    }  
)

const Register = mongoose.model('Register', registerSchema)

module.exports = Register;
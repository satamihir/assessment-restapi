const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
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
    },
    role: {
        type: String,
        required: true
    },
    totalPoints:{
        type: Number, 
        required: true 
    },
});

module.exports = {
    userSchema: mongoose.model("User", userSchema),
}







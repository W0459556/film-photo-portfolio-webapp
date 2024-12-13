import mongoose from "mongoose";
const { Schema, model } = mongoose;

const loginSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // hell yeah regex hell yeaaahhhhhh
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
    }
}, { collection: 'users' });

export default new model ('Login', loginSchema);
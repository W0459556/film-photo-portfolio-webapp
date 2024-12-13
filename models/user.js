import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { passwordStrength } from 'check-password-strength';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        maxlength: [100, 'First name must be less than 100 characters'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        maxlength: [100, 'Last name must be less than 100 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [255, 'Password must be less than 255 characters'],
        validate: {
            validator: (v) => {
                const result = passwordStrength(v);
                return result.value === "Medium" || result.value === "Strong";
            },
            message: "Password too weak, must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters",
        },
    },
});

export default model('User', userSchema);
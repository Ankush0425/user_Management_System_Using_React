import mongoose from "mongoose";
// import autoIncrement from 'mongoose-auto-increment';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
import mongoose, * as mongooose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    place: String
})
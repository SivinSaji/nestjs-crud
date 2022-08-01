import mongoose, * as mongooose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    admin: String
})
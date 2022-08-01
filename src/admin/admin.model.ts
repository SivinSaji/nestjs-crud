import mongoose from "mongoose";
import * as bcrypt from "bcrypt";

export const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (): Promise<any> {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.verifyPassword = async function (password: string): Promise<any> {
    return await bcrypt.compare(password, this.password)
}

export interface User {
    name: string
    email: string
    password: string
}
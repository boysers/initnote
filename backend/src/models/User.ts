import { Schema, model } from 'mongoose'
import uniqueValidator = require('mongoose-unique-validator')
import { IUser } from '../interfaces/User'

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}).plugin(uniqueValidator)

const User = model<IUser>('User', userSchema)

export default User

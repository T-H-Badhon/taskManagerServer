import mongoose, { Schema } from 'mongoose'
import { TUser } from './users.interfaces'

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model('user', userSchema)

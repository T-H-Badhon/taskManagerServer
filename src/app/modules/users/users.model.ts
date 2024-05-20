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
    role: {
      type: String,
      enum: ['MANAGER', 'EMPLOYEE', 'ADMIN'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model('user', userSchema)

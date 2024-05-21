import mongoose, { Schema } from 'mongoose'

import { TCategory } from './category.interface'

const categorySchema = new Schema<TCategory>(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Category = mongoose.model('category', categorySchema)

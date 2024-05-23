import mongoose, { Schema } from 'mongoose'

import { TCategory } from './category.interface'

const categorySchema = new Schema<TCategory>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
)

export const Category = mongoose.model('category', categorySchema)

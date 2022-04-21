import { Schema, model } from 'mongoose'
import { IMark } from '../interfaces/Mark'

const markSchema = new Schema<IMark>({
  userId: { type: String, required: true },
  isPrivate: { type: Boolean, required: true, default: true },
  title: { type: String },
  comment: { type: String },
  imageUrl: { type: String }
})

const Mark = model<IMark>('Mark', markSchema)

export default Mark

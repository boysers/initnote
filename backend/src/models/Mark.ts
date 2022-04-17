import { Schema, model } from 'mongoose'
import { IMark } from '../interfaces/Mark'

const markSchema = new Schema<IMark>({
  title: { type: String, required: true },
  comment: { type: String }
})

export const Mark = model<IMark>('Mark', markSchema)

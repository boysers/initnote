import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import Mark from '../models/Mark'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!Types.ObjectId.isValid(req.params.id))
      throw new Error('Incorrect Id !')

    const mark = await Mark.findOne({
      _id: req.params.id
    })

    if (!mark) throw new Error('Not found !')

    if (req.auth.userId !== mark.userId && mark.isPrivate)
      throw new Error(`The note is private, unauthorized request !`)

    const { _id, isPrivate, title, comment, imageUrl } = mark

    const markObject = { id: _id, title, comment, imageUrl }

    if (!req.auth.userId) {
      req.mark = markObject
    } else {
      req.mark = { ...markObject, isPrivate }
    }

    next()
  } catch ({ message }) {
    res.status(401).json({ message })
  }
}

import { NextFunction, Request, Response } from 'express'
import Mark from '../models/Mark'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mark = await Mark.findOne({
      _id: req.params.id,
      userId: req.auth.userId
    })

    if (!mark) throw new Error('Unauthorized request !')

    req.oldImageUrl = mark.imageUrl

    next()
  } catch ({ message }) {
    res.status(401).json({ message })
  }
}

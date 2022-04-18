import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IDecodedToken } from '../interfaces/DecodedToken'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { userId } = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    ) as IDecodedToken
    req.auth = { userId }

    if (req.body.userId && req.body.userId !== userId)
      throw new Error('Invalid user ID')

    next()
  } catch ({ message }) {
    res.status(401).json({ message })
  }
}

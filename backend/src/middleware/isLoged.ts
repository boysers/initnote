import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IDecodedToken } from '../interfaces/DecodedToken'

export default (req: Request, res: Response, next: NextFunction): void => {
  const bearerToken = req.headers.authorization

  try {
    if (!bearerToken) throw new Error('Unauthorized request !')

    if (!bearerToken.startsWith('Bearer '))
      throw new Error("The token must have 'Bearer' followed by a space")

    const token = bearerToken.split(' ')[1]

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    ) as IDecodedToken

    req.auth = { userId: decodedToken.userId }

    if (req.body.userId && req.body.userId !== decodedToken.userId)
      throw new Error('Invalid user ID')

    next()
  } catch (error) {
    req.auth = { error }

    next()
  }
}

import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const protectedAuth = req.auth

  try {
    if (protectedAuth.error) {
      throw protectedAuth.error
    }

    next()
  } catch ({ message }) {
    res.status(401).json({ message })
  }
}

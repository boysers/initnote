import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/User'
import User from '../models/User'

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUser

  const regexEmail =
    /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  try {
    if (!email.match(regexEmail)) throw new Error('Email non valide')

    const hash = await bcrypt.hash(password, 10)

    const user = new User({ email, password: hash })

    await user.save()

    res.status(201).json({ message: 'User created !' })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUser

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'User not found !' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({ error: 'Incorrect password !' })

    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
      })
    })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
}

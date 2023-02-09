import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/User'
import User from '../models/User'
import isValidEmail from '../utils/isValidEmail'

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUser

  try {
    if (!isValidEmail(email)) throw new Error('Invalid Email')

    const hash = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hash,
      created: new Date(),
      lastLogin: new Date()
    })

    await user.save()

    res.status(201).json({ message: 'User created !' })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as IUser

  try {
    if (!isValidEmail(email)) throw new Error('Invalid Email')

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'User not found !' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({ error: 'Incorrect password !' })

    // user.lastLogin = new Date()
    // await user.save()

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        created: user.created,
        lastLogin: user.lastLogin
      },
      token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
      })
    })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
}

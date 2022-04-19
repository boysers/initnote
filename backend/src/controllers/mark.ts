import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { IMark } from '../interfaces/Mark'
import Mark from '../models/Mark'

export const createMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, comment } = req.body as IMark

  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : undefined

  const markObject = {
    userId: req.auth.userId,
    title,
    comment,
    imageUrl
  }

  const mark = new Mark(markObject)

  try {
    await mark.save()

    res.status(201).json({ message: 'note created !' })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

export const modifyMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const markObject = req.body as IMark

    const imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`

    await Mark.updateOne({ _id: req.params.id }, { ...markObject, imageUrl })
    fs.unlinkSync(
      path.join(__dirname, '../images', req.oldImageUrl.split('/images/')[1])
    )

    res.status(200).json({ message: 'note modified !' })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

export const deleteMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    fs.unlink(
      path.join(__dirname, '../images', req.oldImageUrl.split('/images/')[1]),
      async () => await Mark.deleteOne({ _id: req.params.id })
    )

    res.status(200).json({ message: 'note deleted !' })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

export const getOneMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const mark = await Mark.findOne({
      _id: req.params.id
    })

    if (!mark) throw new Error('Not found !')

    const { _id, title, comment, imageUrl } = mark

    res.status(200).json({ id: _id, title, comment, imageUrl })
  } catch ({ message }) {
    res.status(404).json({ message })
  }
}

export const getAllMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const Marks = (await Mark.find({ userId: req.auth.userId })).map(
      ({ _id, title, comment, imageUrl }) => ({
        id: _id,
        title,
        comment,
        imageUrl
      })
    )

    res.status(200).json(Marks)
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

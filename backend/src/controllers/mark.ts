import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { IMark } from '../interfaces/Mark'
import Mark from '../models/Mark'

export const createMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  const markObject = req.body as IMark

  const mark = new Mark({
    ...markObject,
    userId: req.auth.userId,
    created: new Date(),
    lastUpdate: new Date(),
    imageUrl: req.file ? `/images/${req.file.filename}` : undefined
  })

  try {
    await mark.save()

    res.status(201).json({ message: 'note created !' })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

export const modifyMarkImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) throw new Error('No image sent')

    await Mark.updateOne(
      { _id: req.params.id },
      {
        imageUrl: `/images/${req.file.filename}`,
        lastUpdate: new Date()
      }
    )

    if (req.mark.imageUrl)
      fs.unlinkSync(
        path.join(
          __dirname,
          '../images',
          req.mark.imageUrl.split('/images/')[1]
        )
      )

    res.status(200).json({ message: 'image modified !' })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

export const deleteMarkImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.mark.imageUrl) throw new Error('Image not exist!')

    await Mark.updateOne(
      { _id: req.params.id },
      {
        $unset: { imageUrl: 1 },
        lastUpdate: new Date()
      }
    )

    fs.unlinkSync(
      path.join(__dirname, '../images', req.mark.imageUrl.split('/images/')[1])
    )

    res.status(200).json({ message: 'image deleted !' })
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

    await Mark.updateOne(
      { _id: req.params.id },
      { ...markObject, lastUpdate: new Date() }
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
    await Mark.deleteOne({ _id: req.params.id })

    if (req.mark.imageUrl)
      fs.unlinkSync(
        path.join(
          __dirname,
          '../images',
          req.mark.imageUrl.split('/images/')[1]
        )
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
    const mark = req.mark

    res.status(200).json(mark)
  } catch ({ message }) {
    res.status(404).json({ message })
  }
}

export const getAllMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const Marks = (await Mark.find({ userId: req.auth.userId }))
      .map(
        ({
          _id,
          isPrivate,
          created,
          lastUpdate,
          title,
          comment,
          url,
          imageUrl
        }) => ({
          id: _id,
          isPrivate,
          created,
          lastUpdate,
          title,
          comment,
          url,
          imageUrl
        })
      )
      .reverse()

    res.status(200).json(Marks)
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

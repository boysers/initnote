import { Request, Response } from 'express'
import { Mark } from '../models/Mark'

export const createMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  const markObject = req.body

  const mark = new Mark({ ...markObject })

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
    await Mark.updateOne({ _id: req.params.id }, { ...req.body })
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
    const { title, comment, _id } = await Mark.findOne({ _id: req.params.id })

    res.status(200).json({ id: _id, title, comment })
  } catch ({ message }) {
    res.status(404).json({ message })
  }
}

export const getAllMark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const Marks = (await Mark.find()).map(({ _id, title, comment }) => ({
      id: _id,
      title,
      comment
    }))

    res.status(200).json(Marks)
  } catch ({ message }) {
    res.status(400).json({ message })
  }
}

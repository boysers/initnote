import { Router } from 'express'
import protectedAuth from '../middleware/protectedAuth'
import multer from '../middleware/multer-config'
import {
  createMark,
  deleteMark,
  deleteMarkImage,
  getAllMark,
  getOneMark,
  modifyMark,
  modifyMarkImage
} from '../controllers/mark'
import isAuthor from '../middleware/isAuthor'
import isPrivate from '../middleware/isPrivate'

const router: Router = Router()

router.post('/', protectedAuth, multer, createMark)
router.put('/:id/image', protectedAuth, isAuthor, multer, modifyMarkImage)
router.delete('/:id/image', protectedAuth, isAuthor, deleteMarkImage)
router.put('/:id', protectedAuth, isAuthor, modifyMark)
router.delete('/:id', protectedAuth, isAuthor, deleteMark)
router.get('/:id', isPrivate, getOneMark)
router.get('/', protectedAuth, getAllMark)

export default router

import { Router } from 'express'
import multer from '../middleware/multer-config'
import {
  createMark,
  deleteMark,
  getAllMark,
  getOneMark,
  modifyMark
} from '../controllers/mark'
import auth from '../middleware/auth'

const router: Router = Router()

router.post('/', auth, multer, createMark)
router.put('/:id', auth, multer, modifyMark)
router.delete('/:id', auth, deleteMark)
router.get('/:id', getOneMark)
router.get('/', auth, getAllMark)

export default router

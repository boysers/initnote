import { Router } from 'express'
import {
  createMark,
  deleteMark,
  getAllMark,
  getOneMark,
  modifyMark
} from '../controllers/mark'
import auth from '../middleware/auth'

const router: Router = Router()

router.post('/', auth, createMark)
router.put('/:id', auth, modifyMark)
router.delete('/:id', auth, deleteMark)
router.get('/:id', getOneMark)
router.get('/', auth, getAllMark)

export default router

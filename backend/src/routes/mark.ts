import { Router } from 'express'
import {
  createMark,
  deleteMark,
  getAllMark,
  getOneMark,
  modifyMark
} from '../controllers/mark'

const router: Router = Router()

router.post('/', createMark)
router.put('/:id', modifyMark)
router.delete('/:id', deleteMark)
router.get('/:id', getOneMark)
router.get('/', getAllMark)

export default router

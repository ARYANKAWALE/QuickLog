import { Router } from 'express'
import { registerUser, loginUser, updateProfile } from '../controllers/user.controllers.js'
import authMiddleware from '../utils/authMiddleware.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/profile', authMiddleware, updateProfile)

export default router

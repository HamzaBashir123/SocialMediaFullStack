import express from 'express'
import { getProfile, updateProfile ,deleteProfile, followProfile, unFollowProfile} from '../controllers/profileController.js'

const profileRoutes = express.Router()

profileRoutes.get('/:id', getProfile)
profileRoutes.put('/:id', updateProfile)
profileRoutes.delete('/:id', deleteProfile)
profileRoutes.put('/:id/follow', followProfile)
profileRoutes.put('/:id/unFollow', unFollowProfile)

export default profileRoutes
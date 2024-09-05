import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateProfile } from "../controllers/user.controller.js";
const router = Router()

router.get('/profile/:username',protectRoute,getUserProfile)
router.get('/suggested',protectRoute,getSuggestedUsers)
router.get('/follow/:id',protectRoute,followUnfollowUser)
router.get('/update',protectRoute,updateProfile)

export default router
import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updatePassword, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middleware/mutler.middleware.js";
const router = Router()

router.get('/profile/:username',protectRoute,getUserProfile)

router.get('/suggested',protectRoute,getSuggestedUsers)

router.get('/follow/:id',protectRoute,followUnfollowUser)

router.route('/profile/updateProfile').post(
  protectRoute,
    upload.fields([
      { name: 'profileImg', maxCount: 1 },
      { name: 'coverImg', maxCount: 1 }
    ]),
    updateProfile
  );

router.get('/update',protectRoute,updatePassword)

export default router
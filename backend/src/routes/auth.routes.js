import { Router } from "express";
import { getMe, login, signout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { upload } from "../middleware/mutler.middleware.js";

const router = Router();

router.get('/me',protectRoute, getMe)
router.post('/login',login)
// router.post('/signup',signup)
router.route('/signup').post(
    upload.fields([
      { name: 'profileImg', maxCount: 1 },
      { name: 'coverImg', maxCount: 1 }
    ]),
    signup
  );

router.post('/signout',signout)

export default router;
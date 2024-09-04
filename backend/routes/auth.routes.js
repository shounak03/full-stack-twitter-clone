import { Router } from "express";
import { getMe, login, signout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.get('/me',protectRoute, getMe)
router.post('/login',login)
router.post('/signup',signup)
router.post('/signout',signout)

export default router;
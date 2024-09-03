import { Router } from "express";
import { login, signout, signup } from "../controllers/auth.controller.js";

const router = Router();

router.get('/login',login)
router.post('/signup',signup)
router.get('/signout',signout)

export default router;
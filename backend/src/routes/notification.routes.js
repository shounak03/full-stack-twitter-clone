import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { delNotification, getNotification } from "../controllers/notification.controller.js";
const router = Router()

router.route("/").get(protectRoute,getNotification)
router.route("/delete").delete(protectRoute,delNotification)

export default router
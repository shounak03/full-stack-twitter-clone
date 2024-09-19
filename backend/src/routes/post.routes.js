import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { commentOnPost, createPost, deleatePost, likePost, getAllPost,getLikedPost,followingPost, getUserPost, getPost } from "../controllers/post.controller.js";
import { upload } from "../middleware/mutler.middleware.js";
const router = Router();

router.route('/all').get(protectRoute,getAllPost)
router.route('/following').get(protectRoute,followingPost)
router.route('/createPost').post(protectRoute,upload.single('img'),createPost)
router.route('/user/:username').get(protectRoute,getUserPost)
router.route('/like/:id').post(protectRoute,likePost) //id - PostId
router.route('/likes/:userId').get(protectRoute,getLikedPost)
router.route('/comment/:id').post(protectRoute,commentOnPost)
router.route('/delete/:id').delete(protectRoute,deleatePost)
router.route('/post/:id').get(protectRoute,getPost)

export default router;
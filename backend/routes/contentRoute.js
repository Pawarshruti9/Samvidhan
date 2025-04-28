import { Router } from "express";
import isAuthenticatedUser from "../middleware/Auth.js";
import { AddContent, getContent } from "../controllers/contentController.js";

const router = Router();
router.route('/add').post(AddContent);
router.route('/getbyname').post(isAuthenticatedUser, getContent);
export default router;
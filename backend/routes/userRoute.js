import { Router } from "express";
import { deleteUser, getAllUsers, getCurrentUser, getSingleUser, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import isAuthenticatedUser from "../middleware/Auth.js";

const router = Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/getcurrentuser').get(isAuthenticatedUser, getCurrentUser);
router.route('/getalluser').get(isAuthenticatedUser, getAllUsers);
router.route('/getsingleuser/:id').get(isAuthenticatedUser, getSingleUser);
router.route('/delete/:id').delete(isAuthenticatedUser, deleteUser);
export default router;
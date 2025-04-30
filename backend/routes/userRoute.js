import { Router } from "express";
import { deleteUser, getAllUsers, getCurrentUser, getSingleUser, loginUser, logoutUser, registerUser, updateProgress, generateCertificate } from "../controllers/userController.js";
import isAuthenticatedUser from "../middleware/Auth.js";

const router = Router();

// Debug middleware for user routes
router.use((req, res, next) => {
    console.log('User route accessed:', {
        method: req.method,
        path: req.path,
        params: req.params
    });
    next();
});

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logoutUser);
router.route('/getcurrentuser').get(isAuthenticatedUser, getCurrentUser);
router.route('/getalluser').get(isAuthenticatedUser, getAllUsers);
router.route('/getsingleuser/:id').get(isAuthenticatedUser, getSingleUser);
router.route('/delete/:id').delete(isAuthenticatedUser, deleteUser);
router.route('/updateprogress').post(isAuthenticatedUser, updateProgress);
router.route('/certificate/:moduleName').get(isAuthenticatedUser, generateCertificate);

export default router;
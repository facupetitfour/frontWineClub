import { Router } from 'express';
import AuthController from '../controller/authController.js';
import RoutesAuth from '../middleware/routesAuth.js'

const router = Router();
const controller = new AuthController
const middleware = new RoutesAuth()

router.post('/logIn', controller.handleLogin);
router.post('/register',controller.handleRegister);
router.post('/logOut',controller.handleLogOut);
router.post('/chagepasssword', middleware.handleValidateToken, controller.handleChangePasswordWhithOldPassword)

export default router;

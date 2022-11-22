import { Router } from 'express';
import LoginController from '../controllers/loginController';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginController.login.bind(loginController));
router.post('/register', loginController.createUser.bind(loginController));
router.get('/users', loginController.findAll.bind(loginController));

export default router;

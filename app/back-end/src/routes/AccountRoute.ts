import { Router } from 'express';
import AccountsController from '../controllers/accountController';
import auth from '../middlewares/auth';

const router = Router();
const accountsController = new AccountsController();

router.get('/:id', auth, accountsController.findOneAccount.bind(accountsController));

export default router;

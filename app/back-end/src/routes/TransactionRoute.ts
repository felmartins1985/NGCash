import { Router } from 'express';
import TransactionController from '../controllers/transactionController';
import auth from '../middlewares/auth';

const router = Router();
const transactionController = new TransactionController();

router.post('/', auth, transactionController.createTransaction.bind(transactionController));
router.get('/filter', transactionController.filterTransaction.bind(transactionController));
router.get('/:id', transactionController.findTransactionsUser).bind(transactionController);

export default router;

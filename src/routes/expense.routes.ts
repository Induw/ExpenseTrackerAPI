import { Router } from 'express';
import { getExpenses, addExpense, deleteExpense, updateExpense } from '../controllers/expense.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', auth, getExpenses);
router.post('/', auth, addExpense);
router.delete('/:id', auth, deleteExpense);
router.put('/:id', auth, updateExpense);

export default router;
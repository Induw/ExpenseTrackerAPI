import { Response } from 'express';
import Expense from '../models/expense.model';
import { AuthRequest } from '../middleware/auth';

export const getExpenses = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const { filter, start, end } = req.query as { filter?: string; start?: string; end?: string };
  let dateFilter = {};
  if (filter === 'pastWeek') {
    dateFilter = { date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
  } else if (filter === 'lastMonth') {
    dateFilter = { date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
  } else if (filter === 'last3Months') {
    dateFilter = { date: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } };
  } else if (filter === 'custom' && start && end) {
    dateFilter = { date: { $gte: new Date(start), $lte: new Date(end) } };
  }
  try {
    const expenses = await Expense.find({ userId, ...dateFilter });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { amount, category, date, description } = req.body;
  console.log('Add expense request:', { userId, amount, category, date, description }); // Debug log
  try {
    const expense = new Expense({ userId, amount, category, date, description });
    console.log('Saving expense:', expense); // Debug log
    await expense.save();
    console.log('Expense saved:', expense); // Debug log
    res.status(201).json(expense);
  } catch (err) {
    console.error('Add expense error:', err); // Detailed error log
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;
  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId });
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.userId!;
  const { id } = req.params;
  const { amount, category, date, description } = req.body;
  try {
    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return; 
    }
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    expense.description = description || expense.description;
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
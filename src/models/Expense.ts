import mongoose, { Schema, Document } from 'mongoose';

interface IExpense extends Document {
  user: mongoose.Types.ObjectId;
  category: 'Groceries' | 'Leisure' | 'Electronics' | 'Utilities' | 'Clothing' | 'Health' | 'Others';
  amount: number;
  date: Date;
  description?: string;
}

const expenseSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'],
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

export default mongoose.model<IExpense>('Expense', expenseSchema);
import { Schema, model, Document, Types } from 'mongoose';


interface IExpense extends Document {
  userId: Types.ObjectId;
  amount: number;
  category: 'Groceries' | 'Leisure' | 'Electronics' | 'Utilities' | 'Clothing' | 'Health' | 'Others';
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others']
  },
  date: { type: Date, required: true },
  description: { type: String }
}, { timestamps: true });


export default model<IExpense>('Expense', expenseSchema);
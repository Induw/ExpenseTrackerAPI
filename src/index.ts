import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import expenseRoutes from './routes/expense.routes';


dotenv.config();

const app = express();
app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.send('Server is running');
});
app.use(express.json()); 


app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
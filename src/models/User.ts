import mongoose, { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  export default mongoose.model<IUser>('User', userSchema);
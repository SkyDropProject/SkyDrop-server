import mongoose from 'mongoose';
import { TransactionType } from '../interfaces/Transaction';

const transactionSchema = new mongoose.Schema<TransactionType>({
  slug: 'string',
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export { Transaction };

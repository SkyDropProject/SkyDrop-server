// src/services/TransactionService.ts
import { ObjectId } from 'mongoose';

interface TransactionData {
  slug: string;
  user: ObjectId | string;
  date?: Date;
}

export class TransactionService {
  private transactionDAO: any;

  constructor(factory: any) {
    this.transactionDAO = factory.createTransactionDAO();
  }

  async insertTransaction(data: TransactionData): Promise<any> {
    if (!data.slug || !data.user) {
      throw new Error('Missing transaction data');
    }

    const transaction = {
      slug: data.slug,
      userId: data.user,
      createdAt: data.date ?? new Date(),
    };

    return await this.transactionDAO.insert(transaction);
  }
}

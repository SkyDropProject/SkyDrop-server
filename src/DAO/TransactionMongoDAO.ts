import { Transaction } from '../models/Transaction';
import { functionsMongo } from '../utils/functionsMongo';
import { TransactionDAO } from './TransactionDAO';

class TransactionMongoDAO extends TransactionDAO {
  constructor() {
    super();
  }

  async insert(object: object): Promise<object> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .insert(Transaction, object)
        .then((res: typeof Transaction) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async update(id: string, object: object): Promise<typeof Transaction> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .update(Transaction, id, object)
        .then((res: typeof Transaction) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async delete(id: string): Promise<object> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .delete(Transaction, id)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async find(object: object): Promise<Array<typeof Transaction>> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .find(Transaction, object, null, null)
        .then((res: Array<typeof Transaction>) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async findOne(object: object): Promise<typeof Transaction> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .findOne(Transaction, object)
        .then((res: typeof Transaction) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export { TransactionMongoDAO };

import { Order } from '../models/Order';
import { functionsMongo } from '../utils/functionsMongo';
import { OrderDAO } from './OrderDAO';

class OrderMongoDAO extends OrderDAO {
  constructor() {
    super();
  }

  async insert(object: object): Promise<object> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .insert(Order, object)
        .then((res: typeof Order) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async update(id: string, object: object): Promise<typeof Order> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .update(Order, id, object)
        .then((res: typeof Order) => {
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
        .delete(Order, id)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async find(object: object): Promise<Array<typeof Order>> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .find(Order, object, [{ path: 'userId' }, { path: 'droneId' }, { path: 'products' }], null)
        .then((res: Array<typeof Order>) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async findOne(object: object): Promise<typeof Order> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .findOne(Order, object, [{ path: 'userId' }, { path: 'droneId' }, { path: 'products' }])
        .then((res: typeof Order) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export { OrderMongoDAO };

import { Product } from '../models/Product';
import { functionsMongo } from '../utils/functionsMongo';
import { ProductDAO } from './ProductDAO';

class ProductMongoDAO extends ProductDAO {
  constructor() {
    super();
  }

  async insert(object: object): Promise<object> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .insert(Product, object)
        .then((res: typeof Product) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async update(id: string, object: object): Promise<typeof Product> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .update(Product, id, object)
        .then((res: typeof Product) => {
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
        .delete(Product, id)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async find(object: object): Promise<Array<typeof Product>> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .find(Product, object, null, null)
        .then((res: Array<typeof Product>) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async findOne(object: object): Promise<typeof Product> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .findOne(Product, object)
        .then((res: typeof Product) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export { ProductMongoDAO };

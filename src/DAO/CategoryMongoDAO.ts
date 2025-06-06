import { Category } from '../models/Category';
import { functionsMongo } from '../utils/functionsMongo';
import { CategoryDAO } from './CategoryDAO';

class CategoryMongoDAO extends CategoryDAO {
  constructor() {
    super();
  }

  async insert(object: object): Promise<object> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .insert(Category, object)
        .then((res: typeof Category) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async update(id: string, object: object): Promise<typeof Category> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .update(Category, id, object)
        .then((res: typeof Category) => {
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
        .delete(Category, id)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async find(object: object): Promise<Array<typeof Category>> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .find(Category, object, null, null)
        .then((res: Array<typeof Category>) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async findOne(object: object): Promise<typeof Category> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .findOne(Category, object)
        .then((res: typeof Category) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export { CategoryMongoDAO };

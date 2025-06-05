import { User } from '../models/User';
import { functionsMongo } from '../utils/functionsMongo';
import { UserDAO } from './UserDAO';

class UserMongoDAO extends UserDAO {
  constructor() {
    super();
  }

  async insert(object: object): Promise<object> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .insert(User, object)
        .then((res: typeof User) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async update(id: string, object: object): Promise<typeof User> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .update(User, id, object)
        .then((res: typeof User) => {
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
        .delete(User, id)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async find(object: object): Promise<Array<typeof User>> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .find(User, object, [{ path: 'favoriteProductsId' }, { path: 'cartId' }], null)
        .then((res: Array<typeof User>) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async findOne(object: object): Promise<typeof User> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .findOne(User, object)
        .then((res: typeof User) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export { UserMongoDAO };

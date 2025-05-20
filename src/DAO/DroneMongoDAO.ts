import { Drone } from '../models/Drone';
import { functionsMongo } from '../utils/functionsMongo';
import { DroneDAO } from './DroneDAO';

class DroneMongoDAO extends DroneDAO {
  constructor() {
    super();
  }

  async insert(object: object): Promise<object> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .insert(Drone, object)
        .then(() => {
          resolve(object);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async update(id: string, object: object): Promise<typeof Drone> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .update(Drone, id, object)
        .then((res: typeof Drone) => {
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
        .delete(Drone, id)
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async find(object: object): Promise<Array<typeof Drone>> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .find(Drone, object, null, null)
        .then((res: Array<typeof Drone>) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async findOne(object: object): Promise<typeof Drone> {
    return new Promise((resolve, reject) => {
      functionsMongo
        .findOne(Drone, object)
        .then((res: typeof Drone) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export { DroneMongoDAO };

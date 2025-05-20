import { DAO } from './DAO';

abstract class DroneDAO extends DAO {
  abstract insert(object: object): Promise<any>;

  abstract update(id: string, object: object): Promise<any>;

  abstract delete(id: string): Promise<any>;

  abstract find(object: object): Promise<Array<any>>;

  abstract findOne(object: object): Promise<any>;
}

export { DroneDAO };

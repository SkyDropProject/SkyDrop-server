import { CategoryMongoDAO } from './CategoryMongoDAO';
import { DAOFactory } from './DAOFactory';
import { DroneMongoDAO } from './DroneMongoDAO';
import { OrderMongoDAO } from './OrderMongoDAO';
import { ProductMongoDAO } from './ProductMongoDAO';
import { UserMongoDAO } from './UserMongoDAO';

class DAOMongoFactory extends DAOFactory {
  constructor() {
    super();
  }

  createProductDAO(): ProductMongoDAO {
    return new ProductMongoDAO();
  }

  createUserDAO(): UserMongoDAO {
    return new UserMongoDAO();
  }

  createDroneDAO(): DroneMongoDAO {
    return new DroneMongoDAO();
  }

  createOrderDAO(): OrderMongoDAO {
    return new OrderMongoDAO();
  }

  createCategoryDAO(): CategoryMongoDAO {
    return new CategoryMongoDAO();
  }
}

export { DAOMongoFactory };

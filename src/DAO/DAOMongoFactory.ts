import { CategoryMongoDAO } from './CategoryMongoDAO';
import { DAOFactory } from './DAOFactory';
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

  createCategoryDAO(): CategoryMongoDAO {
    return new CategoryMongoDAO();
  }
}

export { DAOMongoFactory };

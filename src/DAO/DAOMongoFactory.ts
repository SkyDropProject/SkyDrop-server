import { DAOFactory } from './DAOFactory';
import { ProductMongoDAO } from './ProductMongoDAO';

class DAOMongoFactory extends DAOFactory {
  constructor() {
    super();
  }

  createProductDAO():ProductMongoDAO {
    return new ProductMongoDAO();
  }
}

export { DAOMongoFactory };

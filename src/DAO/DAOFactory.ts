abstract class DAOFactory {
  abstract createProductDAO(): any;

  abstract createUserDAO(): any;

  abstract createDroneDAO(): any;

  abstract createOrderDAO(): any;

  abstract createCategoryDAO(): any;
}

export { DAOFactory };

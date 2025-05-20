abstract class DAOFactory {
  abstract createProductDAO(): any;

  abstract createUserDAO(): any;

  abstract createCategoryDAO(): any;
}

export { DAOFactory };

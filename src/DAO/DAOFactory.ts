abstract class DAOFactory {
  abstract createProductDAO(): any;

  abstract createUserDAO(): any;
}

export { DAOFactory };

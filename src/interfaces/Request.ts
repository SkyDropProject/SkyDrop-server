import { Request } from 'express';
import { UserType } from './User';

interface RequestWthUser extends Request {
  user: UserType;
}

export default RequestWthUser;

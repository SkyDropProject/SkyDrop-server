import { Request } from 'express';
import { UserType } from './User';

interface RequestWithUser extends Request {
  user: UserType;
}

export default RequestWithUser;

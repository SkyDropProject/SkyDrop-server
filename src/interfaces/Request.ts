import { Request } from 'express';

interface RequestIsAdmin extends Request {
  isAdmin: boolean;
}

export default RequestIsAdmin;

import { CustomJwtPayload } from '../utils/CustomJwtPayload';

declare global {
  namespace Express {
    interface Request {
      n:String
      user?: CustomJwtPayload;
    }
  }
}
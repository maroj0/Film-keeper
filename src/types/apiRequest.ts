import { Role } from '../auth/db/auth.schema';

export interface ApiRequest extends Request {
  user: {
    id?: string;
    name?: string;
    lastname?: string;
    profession?: string;
    image?: string;
    pointCount?: number;
    authId?: string;
    role: Role;
  };
}

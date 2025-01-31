import { User } from 'src/app/domain/auth';

export interface SessionState {
  userLogged: User | null;
}

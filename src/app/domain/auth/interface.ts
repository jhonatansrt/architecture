import { Observable } from 'rxjs';
import {
  CreateAccount,
  CreateSession,
  CreateSessionApiResponse,
  FindEmail,
  RefreshToken,
  RefreshTokenApiResponse,
  ResetPasword,
  UpdatePassword,
  UpdateProfile,
} from './types';

export abstract class IAuthRepository {
  public abstract createSession(
    props: CreateSession
  ): Observable<CreateSessionApiResponse>;

  public abstract refreshToken(
    props: RefreshToken
  ): Observable<RefreshTokenApiResponse>;

  public abstract getUserLogged(): void;

  public abstract logout(): void;
}

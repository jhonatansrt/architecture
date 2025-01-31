import { Observable } from 'rxjs';
import {
  CreateSession,
  CreateSessionApiResponse,
  RefreshToken,
  RefreshTokenApiResponse,
} from './types';

export abstract class IAuthRepository {
  public abstract createSession(
    props: CreateSession
  ): Observable<CreateSessionApiResponse>;

  public abstract refreshToken(
    props: RefreshToken
  ): Observable<RefreshTokenApiResponse>;
}

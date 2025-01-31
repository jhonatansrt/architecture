import { Injectable } from '@angular/core';
import { IStorageRepository } from 'src/app/domain/storage/i-storage-repository';
import {
  CreateSession,
  CreateSessionApiResponse,
  IAuthRepository,
  RefreshToken,
  RefreshTokenApiResponse,
} from 'src/app/domain/auth';
import { Observable, tap } from 'rxjs';
import { SessionStore } from './session-store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements IAuthRepository {
  constructor(
    private storage: IStorageRepository,
    private auth: IAuthRepository,
    private sessionStore: SessionStore,
    private router: Router
  ) {}

  public createSession(
    props: CreateSession
  ): Observable<CreateSessionApiResponse> {
    return this.auth
      .createSession({
        email: props.email,
        password: props.password,
      })
      .pipe(
        tap((resp) => {
          this.storage.setStorage('token', resp.token);
          this.storage.setStorage('refreshToken', resp.refresh_token);
          this.storage.setStorage('userLogged', resp.user);
          this.getUserLogged();
          this.router.navigate(['/home']);
        })
      );
  }

  public refreshToken(
    props: RefreshToken
  ): Observable<RefreshTokenApiResponse> {
    return this.auth.refreshToken(props);
  }

  public async getUserLogged() {
    const userLogged = await this.storage.getStorage('userLogged');

    if (userLogged) {
      this.sessionStore.set('userLogged', userLogged);
    }
  }

  public logout() {
    this.sessionStore.clear();
    this.storage.clearAll();
    this.router.navigate(['/login']);
  }
}

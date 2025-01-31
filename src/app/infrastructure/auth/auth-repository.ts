import { Injectable } from '@angular/core';
import {
  CreateAccount,
  CreateSession,
  CreateSessionApiResponse,
  FindEmail,
  IAuthRepository,
  RefreshToken,
  RefreshTokenApiResponse,
  ResetPasword,
  UpdatePassword,
  UpdateProfile,
} from 'src/app/domain/auth';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository implements IAuthRepository {
  constructor(private httpClient: HttpClient) {}
  public createSession(
    props: CreateSession
  ): Observable<CreateSessionApiResponse> {
    const url = environment.apiBaseURL + '/sessions';
    return this.httpClient.post<CreateSessionApiResponse>(url, props);
  }

  public createAccount(props: CreateAccount): Observable<void> {
    const url = environment.apiBaseURL + '/users';
    return this.httpClient.post<void>(url, props);
  }

  public updateProfile(props: UpdateProfile): Observable<void> {
    const url = environment.apiBaseURL + '/users';
    return this.httpClient.put<void>(url, props);
  }

  public updatePassword(props: UpdatePassword): Observable<void> {
    const url = environment.apiBaseURL + '/users/password';
    return this.httpClient.patch<void>(url, props);
  }

  public refreshToken(
    props: RefreshToken
  ): Observable<RefreshTokenApiResponse> {
    const url = environment.apiBaseURL + '/refresh-token';
    return this.httpClient.post<RefreshTokenApiResponse>(url, props);
  }

  public updateAvatar(avatar: Blob | string): Observable<void> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    let formData = new FormData();
    formData.append('avatar', avatar);

    const url = environment.apiBaseURL + '/users/avatar';
    return this.httpClient.patch<void>(url, formData, { headers });
  }

  public findEmail(props: FindEmail): Observable<void> {
    const url = environment.apiBaseURL + '/password/forgot';
    return this.httpClient.post<void>(url, props);
  }

  public resetPassword(props: ResetPasword): Observable<void> {
    const url = `${environment.apiBaseURL}/password/reset?token=${props.token}`;
    return this.httpClient.post<void>(url, props);
  }
}

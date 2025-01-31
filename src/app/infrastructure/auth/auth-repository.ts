import { Injectable } from '@angular/core';
import {
  CreateSession,
  CreateSessionApiResponse,
  IAuthRepository,
  RefreshToken,
  RefreshTokenApiResponse,
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

  public refreshToken(
    props: RefreshToken
  ): Observable<RefreshTokenApiResponse> {
    const url = environment.apiBaseURL + '/refresh-token';
    return this.httpClient.post<RefreshTokenApiResponse>(url, props);
  }
}

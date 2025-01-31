import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, from, switchMap, catchError, throwError, map } from 'rxjs';
import { InterceptorService } from 'src/app/aplication/interceptor/interceptor-service';
import { IAuthRepository, RefreshToken } from 'src/app/domain/auth';
import { IStorageRepository } from 'src/app/domain/storage/i-storage-repository';
import { LoadingService } from 'src/app/presentation/common/loading/loading.service';
import { ToastService } from 'src/app/presentation/common/toast/toast.service';

export class HttpClientInterceptor implements HttpInterceptor {
  constructor(
    private loading: LoadingService,
    private toast: ToastService,
    private interceptor: InterceptorService,
    private storage: IStorageRepository,
    private auth: IAuthRepository
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.interceptor.loading) {
      this.loading.openLoading();
    }

    return from(this.storage.getStorage('token')).pipe(
      switchMap((authToken) => {
        // Garante que authToken seja uma string válida
        const validToken = authToken ? authToken : '';

        // Adiciona o cabeçalho de autenticação
        request = this.addAuthHeaders(request, validToken);

        return next.handle(request).pipe(
          catchError((err: any) => {
            if (this.interceptor.loading) {
              this.loading.closeLoading();
            }

            if (err instanceof HttpErrorResponse) {
              if (err.error.message === 'Invalid token') {
                return this.handleTokenInvalid(request, next);
              }

              if (err.error.message.includes('jwt expired')) {
                if (this.interceptor.toast) {
                  this.toast.openToast({
                    success: false,
                    title: 'Atenção',
                    message: 'Seu token expirou, você precisa logar novamente',
                  });
                }

                return throwError(() => err);
              }

              if (this.interceptor.toast) {
                this.toast.openToast({
                  success: false,
                  title: 'Atenção',
                  message: err.error.message || 'Ocorreu um erro no servidor',
                });
              }
            }

            return throwError(() => err);
          }),
          map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
            if (evt instanceof HttpResponse) {
              if (this.interceptor.loading) {
                this.loading.closeLoading();
              }
            }
            return evt;
          })
        );
      })
    );
  }

  private addAuthHeaders(
    request: HttpRequest<unknown>,
    authToken: string
  ): HttpRequest<unknown> {
    // Define os cabeçalhos de acordo com a presença do 'Content-Type'
    const headers: Record<string, string> = !request.headers.has('Content-Type')
      ? { Authorization: `Bearer ${authToken}` }
      : {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };

    // Clona a requisição e adiciona os cabeçalhos
    return request.clone({ setHeaders: headers });
  }

  private handleTokenInvalid(request: HttpRequest<any>, next: HttpHandler) {
    return from(this.storage.getStorage('refreshToken')).pipe(
      switchMap((token) => {
        let refreshToken = new RefreshToken();
        refreshToken.token = token || '';

        return this.auth.refreshToken(refreshToken).pipe(
          switchMap((resp: any) => {
            const token = resp.token;
            const refreshToken = resp.refresh_token;
            this.storage.setStorage('token', token);
            this.storage.setStorage('refreshToken', refreshToken);

            request = this.addAuthHeaders(request, token);

            return next.handle(request.clone());
          })
        );
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}

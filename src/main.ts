import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { providers } from './app/infrastructure/providers';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpClientInterceptor } from './app/infrastructure/interceptor/http-client.interceptor';
import { IStorageRepository } from './app/domain/storage/i-storage-repository';
import { IAuthRepository } from './app/domain/auth';
import { ToastService } from './app/presentation/common/toast/toast.service';
import { LoadingService } from './app/presentation/common/loading/loading.service';
import { InterceptorService } from './app/aplication/interceptor/interceptor-service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    ...providers,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
      deps: [
        LoadingService,
        ToastService,
        InterceptorService,
        IStorageRepository,
        IAuthRepository,
      ],
    },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
  ],
});

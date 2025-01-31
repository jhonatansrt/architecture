import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./presentation/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IStorageRepository } from '../domain/storage/i-storage-repository';

@Injectable({
  providedIn: 'root',
})
export class IsSignedInGuardGuard {
  constructor(private storage: IStorageRepository, private router: Router) {}

  async canActivate(): Promise<
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
  > {
    if (await this.storage.getStorage('userLogged')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

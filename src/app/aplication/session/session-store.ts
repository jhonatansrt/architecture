import { Injectable } from '@angular/core';
import { IStorageRepository } from 'src/app/domain/storage/i-storage-repository';
import { StoreService } from '../store.service';
import { SessionState } from './types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionStore extends StoreService<SessionState> {
  constructor(private storage: IStorageRepository, private router: Router) {
    super();
  }

  public async getUserLogged() {
    const userLogged = await this.storage.getStorage('userLogged');

    if (userLogged) {
      this.set('userLogged', userLogged);
    }
  }

  public logout() {
    this.clear();
    this.storage.clearAll();
    this.router.navigate(['/login']);
  }

  protected override getInitialState(): SessionState {
    return {
      userLogged: null,
    };
  }
}

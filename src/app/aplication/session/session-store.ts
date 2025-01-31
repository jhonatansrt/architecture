import { Injectable } from '@angular/core';
import { StoreService } from '../store.service';
import { SessionState } from './types';

@Injectable({
  providedIn: 'root',
})
export class SessionStore extends StoreService<SessionState> {
  constructor() {
    super();
  }

  protected override getInitialState(): SessionState {
    return {
      userLogged: null,
    };
  }
}

import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from 'src/app/domain/auth';

@Injectable({
  providedIn: 'root',
})
export class SessionStore {
  public readonly userLogged: WritableSignal<User | undefined> =
    signal(undefined);
}

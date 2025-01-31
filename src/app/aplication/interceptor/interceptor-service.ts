import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  public loading: boolean = true;
  public toast: boolean = true;

  constructor() {}
}

import { Injectable } from '@angular/core';
import { Container } from 'src/app/util/container.service';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private container: Container) {}

  public openLoading() {
    this.container.vcr?.createComponent(LoadingComponent);
  }

  public closeLoading() {
    const loadingPercentage = document.getElementById(
      'loadingPercentage'
    ) as HTMLElement;
    loadingPercentage.innerText = '100%';
    const loadingImg = document.getElementById('loadingImg') as HTMLElement;
    loadingImg.classList.add('removeAnimation');
    setTimeout(() => {
      document.querySelector('app-loading')?.remove();
    }, 100);
  }
}

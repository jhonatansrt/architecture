import { Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';
import { Container } from 'src/app/util/container.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private timeout: any;

  constructor(private container: Container) {}

  private initTimeout() {
    this.timeout = setTimeout(() => {
      this.closeToast();
    }, 10000);
  }

  private clearTimeout() {
    clearTimeout(this.timeout);
  }

  public openToast(props: {
    success: boolean;
    title: string;
    message: string;
  }) {
    this.clearTimeout();
    document.querySelector('app-toast')?.remove();

    const toast = this.container.vcr?.createComponent(ToastComponent).instance;
    toast!.success = props.success;
    toast!.title = props.title;
    toast!.message = props.message;

    this.initTimeout();
  }

  public closeToast() {
    this.clearTimeout();
    document.getElementById('toast')?.classList.add('fadeOut');

    setTimeout(() => {
      document.querySelector('app-toast')?.remove();
    }, 200);
  }
}

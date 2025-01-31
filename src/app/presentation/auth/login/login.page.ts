import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreateSession } from 'src/app/domain/auth';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons';
import { SessionService } from 'src/app/aplication/session/session-service';
import { InterceptorService } from 'src/app/aplication/interceptor/interceptor-service';
import { ToastService } from '../../common/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage {
  public showPassword: boolean = false;

  public propsCreateSession: CreateSession = new CreateSession();

  public formCreateSession = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private interceptor: InterceptorService,
    private toast: ToastService
  ) {
    addIcons({ eye, eyeOff });
  }

  // simple login
  public async login() {
    this.sessionService.createSession(this.propsCreateSession).subscribe();
  }

  // simple with disableToast
  // public async login() {
  //   this.interceptor.toast = false;

  //   this.sessionService.createSession(this.propsCreateSession).subscribe({
  //     error: () => {
  //       this.toast.openToast({
  //         success: false,
  //         title: 'Atenção',
  //         message: 'Erro ao logar',
  //       });
  //     },

  //     complete: () => {
  //       this.interceptor.toast = true;
  //     },
  //   });
  // }

  // simple with disableLoading
  // public async login() {
  //   this.interceptor.loading = false;

  //   this.sessionService.createSession(this.propsCreateSession).subscribe({
  //     complete: () => {
  //       this.interceptor.loading = true;
  //     },
  //   });
  // }

  // // simple with disableToast
  // public async login() {
  //   this.interceptorStore.set('disableToast', true);

  //   this.sessionService.createSession(this.propsCreateSession).subscribe({
  //     next: () => {
  //       // Se a criação da sessão for bem-sucedida
  //       // this.navigateTo('');
  //       alert('Logou');
  //     },
  //     error: (err) => {
  //       // Se ocorrer um erro
  //       alert('Erro');
  //     },
  //     complete: () => {
  //       this.interceptorStore.set('disableLoading', false);
  //       // this.interceptorStore.set('disableToast', false);
  //     },
  //   });
  // }

  public navigateTo(route: string = '') {
    this.router.navigate([route]);
  }
}

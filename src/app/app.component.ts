import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { Container } from './util/container.service';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { SessionService } from './aplication/session/session-service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  @ViewChild('main', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  constructor(
    private container: Container,
    private platform: Platform,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.router.url === '/' || this.router.url === '/login') {
        App.exitApp();
      }
    });
  }

  async ngOnInit() {
    this.container.vcr = this.vcr;
    this.sessionService.getUserLogged();
  }
}

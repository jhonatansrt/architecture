import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
})
export class LoadingComponent implements OnInit {
  public percentage: number = 0;

  constructor() {}

  ngOnInit() {
    this.initLoading();
  }

  private initLoading() {
    let timeout = setInterval(() => {
      this.percentage++;

      if (this.percentage === 99) {
        clearInterval(timeout);
      }
    }, 30);
  }
}

import { Component, OnInit } from '@angular/core';
import { HueService } from 'hue';

@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hue-demo';
  constructor(
    private hueService: HueService
  ) {}
  ngOnInit(): void {
    console.log('called');

    this.hueService.discover().then((res) => {
      console.log(res);

      if (!this.hueService.isConnected) {
        this.hueService.register('homexuser').then((ress) => {
          console.log('Got registration ', ress);
        }).catch((err) => {
          console.log('error');
        });
      }

    }, (err) => {
      console.log(err);
    });
  }
}

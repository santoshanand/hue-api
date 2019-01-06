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
    this.hueService.discover().then((res) => {
      // 5Wx3VTEZoswAKjOdBoLjyxztAZgai1TaPrH5DKX8
      if (!this.hueService.isConnected) {
        /*
        this.hueService.register('testuser').then((ress) => {
          console.log('Got registration ', ress);
        }).catch((err) => {
          console.log('error', err);
        });
        */
        this.hueService.setAPIKey('5Wx3VTEZoswAKjOdBoLjyxztAZgai1TaPrH5DKX8');
        this.getLights();

      } else {
        this.getLights();
      }

    }, (err) => {
      console.log(err);
    });
  }

  private getLights() {
    this.hueService.getLights().then((lights) => {
      console.log('lights ', lights);
    }).catch((err) => {
      console.log('error lights', err);
    });
  }
}

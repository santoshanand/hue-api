import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HueModule } from 'hue';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HueModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

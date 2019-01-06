import { NgModule } from '@angular/core';
import { HueComponent } from './hue.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [HueComponent],
  imports: [
    HttpModule
  ],
  exports: [HueComponent]
})
export class HueModule { }

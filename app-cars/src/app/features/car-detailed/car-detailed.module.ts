import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarDetailedRoutingModule } from './car-detailed-routing.module';
import { CarDetailedComponent } from './car-detailed.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CarDetailedComponent
  ],
  imports: [
    CommonModule,
    CarDetailedRoutingModule,
    BrowserModule
   
  ]
})
export class CarDetailedModule { }

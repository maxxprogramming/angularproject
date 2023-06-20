import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReserveCarRoutingModule } from './reserve-car-routing.module';
import { ReserveCarComponent } from './reserve-car.component';

@NgModule({
  declarations: [ReserveCarComponent],
  imports: [CommonModule, ReserveCarRoutingModule],
})
export class ReserveCarModule {}

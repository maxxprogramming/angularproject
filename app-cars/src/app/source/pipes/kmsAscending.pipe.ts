import { Pipe, PipeTransform } from '@angular/core';
import { CarI } from '../car-interface/car-interface';

@Pipe({
  name: 'kmsAscending'
})
export class KmsAscendingPipe implements PipeTransform {
  transform(vehicles: CarI[]): CarI[] {
    if (!vehicles) {
      return []; 
    }
    return vehicles.sort((a, b) => a.kms - b.kms);
  }
}

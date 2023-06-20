import { Pipe, PipeTransform } from '@angular/core';
import { CarI } from '../car-interface/car-interface';

@Pipe({
  name: 'kmsDescending'
})
export class KmsDescendingPipe implements PipeTransform {

  transform(vehicles: CarI[]): CarI[] {

    if (!vehicles) {
      return []; 
    }
    return vehicles.sort((a, b) => b.kms - a.kms);

} }

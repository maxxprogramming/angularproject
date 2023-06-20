import { Pipe, PipeTransform } from '@angular/core';
import { CarI } from '../car-interface/car-interface';

@Pipe({
  name: 'showLimitElements'
})
export class ShowLimitElementsPipe implements PipeTransform {

  transform(items: CarI[], limit: number): CarI[] {
    if (!items) {
      return [];
    }
    return items.slice(0, limit);
  }

}

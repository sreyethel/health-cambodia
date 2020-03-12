import { Pipe, PipeTransform } from '@angular/core';
import { toCalendar } from '../services/mapping.service';

@Pipe({
  name: 'toCalendar'
})
export class ToCalendarPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return toCalendar(value);
  }

}

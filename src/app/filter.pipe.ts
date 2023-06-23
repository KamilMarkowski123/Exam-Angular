import { Pipe, PipeTransform } from '@angular/core';
import { Action } from './definitions'; 

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: Array<any>,
    filterbyKey:string,
    howToFilter: string
  ): Array<any> {
    if (!value) {
      return value;
    }
    if (howToFilter==='show All') {
      return value;
    }
    
    return value.filter((item) => {
      if (item[filterbyKey] === howToFilter) {
        return true;
      }
      
      return false;
    });
  }
}
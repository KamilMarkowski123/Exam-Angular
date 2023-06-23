import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: Array<any>, howToSort:string, sortByKey:string): Array<any> {
    if (!value) {
      return value;
    }
    if(howToSort==='descending'){
      value.sort((a,b)=>b[sortByKey]-a[sortByKey])
      return value;
    }
    else if(howToSort==='ascending'){
      value.sort((a,b)=>a[sortByKey]-b[sortByKey])
      return value;
    }
    else{return value}
  }

}
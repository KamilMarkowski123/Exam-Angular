import { Pipe, PipeTransform } from '@angular/core';
import { playerAction } from './game-page/game-page.component';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<playerAction>, sortHistory:string): Array<playerAction> {
    if (!value) {
      return value;
    }
    if(sortHistory==='descending'){
      value.sort((a,b)=>b.Time-a.Time)
      return value;
    }
    else if(sortHistory==='ascending'){
      value.sort((a,b)=>a.Time-b.Time)
      return value;
    }
    else{return value}
    
  }

}

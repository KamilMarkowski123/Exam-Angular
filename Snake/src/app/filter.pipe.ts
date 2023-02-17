import { Pipe, PipeTransform } from '@angular/core';
import { playerAction } from './game-page/game-page.component';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: Array<playerAction>,
    filterHistory: string
  ): Array<playerAction> {
    if (!value || filterHistory==='show All') {
      return value;
    }
    return value.filter((i) => {
      if (i.Action === filterHistory) {
        return true;
      }
      return false;
    });
  }
}


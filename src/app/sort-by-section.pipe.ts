import {Pipe, PipeTransform} from '@angular/core';
import {Crossroads as InterfaceCrossroads} from './crossroads';

@Pipe({
  name: 'sortBySection'
})
export class SortBySectionPipe implements PipeTransform {

  transform(items: InterfaceCrossroads[], args?: string): any {
    if (!items) {
      return items;
    }

    return items.filter((item: InterfaceCrossroads) => {
      console.log(item.systemStatus);
      return item.systemStatus === args;
    });
  }
}

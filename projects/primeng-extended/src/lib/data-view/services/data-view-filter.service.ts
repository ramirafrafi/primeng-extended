import { Injectable } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Observable, of } from 'rxjs';
import { AbstractDataComponentFilter } from '../../api/classes/abstract-data-component-filter';

@Injectable({
  providedIn: 'root'
})
export class DataViewFilterService extends AbstractDataComponentFilter<DataView> {
  filterStep(
    data: DataView,
    fields: any[],
    filterValue: any,
    filterMatchMode: string,
    filterLocale?: string
  ): Observable<DataView> {
    data.filter(filterValue, filterMatchMode);
    data.filteredValue
      ? data.value = data.filteredValue
      : data.filteredValue = data.value;

    return of(data);
  }

  resetBeforeStart(args: {
    data: DataView;
    fields: any[];
    filterValues: any[];
    filterMatchMode: string;
    filterLocale?: string | undefined;
  }): void { }
}

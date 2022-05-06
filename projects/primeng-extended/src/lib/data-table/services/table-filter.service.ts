import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { AbstractDataComponentFilter } from '../../api/classes/abstract-data-component-filter';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService extends AbstractDataComponentFilter<Table> {
  filterStep(
    data: Table,
    fields: any[],
    filterValue: any,
    filterMatchMode: string,
    filterLocale?: string
  ): Observable<Table> {
    const [field, value, matchMode] = ['global', filterValue, filterMatchMode];

    if (!data.isFilterBlank(value)) {
      data.filters[field] = { value: value, matchMode: matchMode };
    } else if (data.filters[field]) {
      delete data.filters[field];
    }

    data._filter();
    data.filteredValue
      ? data.value = data.filteredValue
      : data.filteredValue = data.value;

    return of(data);
  }

  resetBeforeStart(
    data: Table,
    fields: any[],
    filterValues: any[],
    filterMatchMode: string,
    filterLocale?: string | undefined
  ): void {
    delete data.filters['global'];

    data._filter();
  }
}

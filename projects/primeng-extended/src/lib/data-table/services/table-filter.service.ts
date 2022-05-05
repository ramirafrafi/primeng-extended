import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { AbstractFilter } from '../../api/classes';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService extends AbstractFilter<Table> {
  _value?: any[];

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

  beforeStart(args: {
    data: Table,
    fields: any[],
    filterValues: any[],
    filterMatchMode: string,
    filterLocale?: string,
  }): void {
    this._value = args.data.value;
    
    args.data.reset();
  }

  afterEnd(args: {
    data: Table,
    fields: any[],
    filterValues: any[],
    filterMatchMode: string,
    filterLocale?: string,
  }): void {
    args.data.value = this._value!;
    if (args.data.filteredValue?.length === args.data.value?.length) {
      args.data.filteredValue = null as any;
    }

    this._value = undefined;
  }
}

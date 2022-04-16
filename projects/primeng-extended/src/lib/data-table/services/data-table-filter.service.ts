import { Injectable } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { AbstractMultistepFilter } from '../../api/classes';

@Injectable({
  providedIn: 'root'
})
export class DataTableFilterService extends AbstractMultistepFilter<Table> {
  _value?: any[];

  filterStep(
    table: Table,
    fields: any[],
    filterValue: any,
    filterMatchMode: string,
    filterLocale?: string
  ): Observable<Table> {
    const [field, value, matchMode] = ['global', filterValue, filterMatchMode];

    if (!table.isFilterBlank(value)) {
      table.filters[field] = { value: value, matchMode: matchMode };
    } else if (table.filters[field]) {
      delete table.filters[field];
    }

    table._filter();
    table.filteredValue
      ? table.value = table.filteredValue
      : table.filteredValue = table.value;

    return of(table);
  }

  beforeStart(args: {
    value: Table,
    fields: any[],
    filterValues: any[],
    filterMatchMode: string,
    filterLocale?: string,
  }): void {
    this._value = args.value.value;
    
    args.value.reset();
  }

  afterEnd(args: {
    value: Table,
    fields: any[],
    filterValues: any[],
    filterMatchMode: string,
    filterLocale?: string,
  }): void {
    args.value.value = this._value!;
    if (args.value.filteredValue?.length === args.value.value?.length) {
      args.value.filteredValue = null as any;
    }

    this._value = undefined;
  }
}

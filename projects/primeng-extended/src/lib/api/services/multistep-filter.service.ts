import { Injectable } from '@angular/core';
import { FilterService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { AbstractFilter } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class MultistepFilterService extends AbstractFilter<any[]> {

  constructor(readonly filterService: FilterService) {
    super()
  }

  filterStep(
    value: any[],
    fields: any[],
    filterValue: any,
    filterMatchMode: string,
    filterLocale?: string
  ): Observable<any[]> {
    return of(
      this.filterService.filter(value, fields, filterValue, filterMatchMode, filterLocale)
    );
  }

}

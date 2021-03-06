import { Injectable } from '@angular/core';
import { FilterService as PrimengFilterService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { AbstractFilter } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class FilterService extends AbstractFilter<any[]> {

  constructor(readonly filterService: PrimengFilterService) {
    super()
  }

  filterStep(
    data: any[],
    fields: any[],
    filterValue: any,
    filterMatchMode: string,
    filterLocale?: string
  ): Observable<any[]> {
    return of(
      this.filterService.filter(data, fields, filterValue, filterMatchMode, filterLocale)
    );
  }

}

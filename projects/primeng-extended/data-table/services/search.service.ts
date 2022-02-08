import { FilterMetadata } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  filters: string[] = [];
  filterSub?: Subscription;

  constructor() { }

  addFilter(filter: string) {
    filter?.trim() && this.filters.push(filter.trim());
  }

  setFilters(filters: string[]) {
    this.filters = filters?.filter(filter => filter?.trim());
  }

  deleteFilter(index: number) {
    this.filters.splice(index, 1);
  }

  clearFilters() {
    this.filters = [];
  }

  search(table: Table) {
    const tableValue = table.value || [];
    const filters = this.filters;

    if (table.lazy) {
      table.filterGlobal(filters, '');
      return;
    }

    this.filterSub?.unsubscribe();
    this.filterSub = table.onFilter.subscribe(() => {
      this.filterSub?.unsubscribe();

      if (filters.length > 1) {
        filters.slice(1).forEach(filter => {  
          table.filteredValue && (table.value = table.filteredValue);
          (table.filters['global'] as FilterMetadata).value = filter;
          table._filter();
        });

        !table.filteredValue && (table.filteredValue = table.value);
        table.value = tableValue;
      }
    });

    table.filterGlobal(filters[0], 'contains');
  }

  clear(table: Table) {
    this.clearFilters();
    this.search(table);
  }
}

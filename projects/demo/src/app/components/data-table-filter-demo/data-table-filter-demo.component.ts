import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { DataTableFilterService } from 'projects/primeng-extended/src/lib/data-table/services/data-table-filter.service';

@Component({
  selector: 'app-data-table-filter-demo',
  templateUrl: './data-table-filter-demo.component.html',
  styleUrls: ['./data-table-filter-demo.component.scss']
})
export class DataTableFilterDemoComponent implements OnInit {
  @ViewChild(Table) table?: Table;
  _filters = [];
  value = [];

  get filters() {
    return this._filters;
  }

  set filters(val) {
    this._filters = val;

    this.dtFilter.filter(this.table!, ['global'], this._filters, 'contains')
      .subscribe();
  }

  constructor(
    readonly http: HttpClient,
    readonly dtFilter: DataTableFilterService
  ) { }

  ngOnInit(): void {
    this.http.get('https://api.fda.gov/food/enforcement.json?limit=1000')
      .subscribe((res: any) => this.value = res?.results);
  }

}

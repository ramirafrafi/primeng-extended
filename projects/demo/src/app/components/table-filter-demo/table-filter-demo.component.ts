import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TableFilterService } from 'projects/primeng-extended/src/lib/data-table/services/table-filter.service';

@Component({
  selector: 'app-table-filter-demo',
  templateUrl: './table-filter-demo.component.html',
  styleUrls: ['./table-filter-demo.component.scss']
})
export class TableFilterDemoComponent implements OnInit {
  @ViewChild(Table) table?: Table;
  _filters = [];
  value = [];

  get filters() {
    return this._filters;
  }

  set filters(val) {
    this._filters = val;

    this.filterService.filter(this.table!, ['global'], this._filters, 'contains')
      .subscribe();
  }

  constructor(
    readonly http: HttpClient,
    readonly filterService: TableFilterService
  ) { }

  ngOnInit(): void {
    this.http.get('https://api.fda.gov/food/enforcement.json?limit=1000')
      .subscribe((res: any) => this.value = res?.results);
  }

}

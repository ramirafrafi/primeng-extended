import { Component, Input, OnInit } from '@angular/core';
import { AbstractFilter } from 'projects/primeng-extended/src/lib/api/classes';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent<T> implements OnInit {
  @Input() filterService?: AbstractFilter<T>;
  @Input() data?: T;
  _filters = [];

  constructor() { }

  get filters() {
    return this._filters;
  }

  set filters(val) {
    this._filters = val;

    this.filterService
      ?.filter(this.data || null, [], this._filters, 'contains')
      .subscribe();
  }

  ngOnInit(): void {
  }

}

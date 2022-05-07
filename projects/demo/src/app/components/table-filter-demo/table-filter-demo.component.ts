import { Component, OnInit } from '@angular/core';
import { TableFilterService } from 'projects/primeng-extended/src/lib/data-table/services/table-filter.service';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-table-filter-demo',
  templateUrl: './table-filter-demo.component.html',
  styleUrls: ['./table-filter-demo.component.scss']
})
export class TableFilterDemoComponent implements OnInit {
  value$ = this.foodService.enforcement();

  constructor(
    readonly foodService: FoodService,
    readonly filterService: TableFilterService
  ) { }

  ngOnInit(): void {
  }

}

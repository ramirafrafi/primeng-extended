import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from './directives/data-table.directive';


@NgModule({
  declarations: [
    DataTableDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DataTableDirective,
  ]
})
export class DataTableModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableFilterDemoComponent } from './components/data-table-filter-demo/data-table-filter-demo.component';

const routes: Routes = [
  { path: 'data-table-filter', component: DataTableFilterDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableFilterDemoComponent } from './components/table-filter-demo/table-filter-demo.component';

const routes: Routes = [
  { path: 'table-filter', component: TableFilterDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

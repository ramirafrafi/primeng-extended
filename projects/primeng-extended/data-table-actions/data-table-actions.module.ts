import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './components/action/action.component';
import { ActionListComponent } from './components/action-list/action-list.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';



@NgModule({
  declarations: [
    ActionListComponent,
    ActionComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule,
    ButtonModule,
    RouterModule,
    BadgeModule,
  ],
  exports: [
    ActionListComponent,
    ActionComponent,
  ],
})
export class DataTableActionsModule { }

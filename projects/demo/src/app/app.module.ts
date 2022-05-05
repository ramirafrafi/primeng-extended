import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ChipsModule } from 'primeng/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableFilterDemoComponent } from './components/table-filter-demo/table-filter-demo.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TableFilterDemoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    InputTextModule,
    ChipsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

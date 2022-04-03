import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableFilterDemoComponent } from './data-table-filter-demo.component';

describe('DataTableFilterDemoComponent', () => {
  let component: DataTableFilterDemoComponent;
  let fixture: ComponentFixture<DataTableFilterDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableFilterDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableFilterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

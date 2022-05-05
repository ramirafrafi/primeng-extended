import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterDemoComponent } from './table-filter-demo.component';

describe('TableFilterDemoComponent', () => {
  let component: TableFilterDemoComponent;
  let fixture: ComponentFixture<TableFilterDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFilterDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFilterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

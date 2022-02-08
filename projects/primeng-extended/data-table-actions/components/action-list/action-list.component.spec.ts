import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableActionsListComponent } from './data-table-actions-list.component';

describe('DataTableActionsListComponent', () => {
  let component: DataTableActionsListComponent;
  let fixture: ComponentFixture<DataTableActionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableActionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

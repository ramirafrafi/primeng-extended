import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table } from 'primeng/table';
import { dataComponentValue, doTestDataComponent } from '../../common/data-component.spec';

import { TableFilterService } from './table-filter.service';

describe('TableFilterService', () => {
  let testArgs: {
    service: TableFilterService;
    fixture: ComponentFixture<Table>;
    value: any[];
  } = { service: undefined!, fixture: undefined!, value: undefined! };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    let service = TestBed.inject(TableFilterService);
    let fixture = TestBed.createComponent(Table);
    let value = dataComponentValue();
    fixture.componentInstance.globalFilterFields = ['id', 'value'];
    fixture.componentInstance.value = value;

    Object.assign(testArgs, { service, fixture, value });
  });

  doTestDataComponent(testArgs);
});

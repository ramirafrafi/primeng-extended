import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataView } from 'primeng/dataview';
import { dataComponentValue, doTestDataComponent } from '../../common/data-component.spec';

import { DataViewFilterService } from './data-view-filter.service';

describe('DataViewFilterService', () => {
  let testArgs: {
    service: DataViewFilterService;
    fixture: ComponentFixture<DataView>;
    value: any[];
  } = { service: undefined!, fixture: undefined!, value: undefined! };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    let service = TestBed.inject(DataViewFilterService);
    let fixture = TestBed.createComponent(DataView);
    let value = dataComponentValue();
    fixture.componentInstance.filterBy = 'id,value';
    fixture.componentInstance.value = value;

    Object.assign(testArgs, { service, fixture, value });
  });

  doTestDataComponent(testArgs);
});

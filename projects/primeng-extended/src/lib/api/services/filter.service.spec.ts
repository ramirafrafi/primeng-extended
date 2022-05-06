import { TestBed } from '@angular/core/testing';
import { doTestFilter } from '../../common/do-test-filter.spec';
import { testValue } from '../../common/test-value.spec';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let testArgs: {
    service: FilterService;
    value: any[];
  } = { service: undefined!, value: undefined! };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    let service = TestBed.inject(FilterService);
    let value = testValue();

    Object.assign(testArgs, { service, value });
  });

  doTestFilter(testArgs);
});

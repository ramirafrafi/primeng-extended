import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table } from 'primeng/table';

import { TableFilterService } from './table-filter.service';

describe('TableFilterService', () => {
  let service: TableFilterService;
  let value: any[];
  let fixture: ComponentFixture<Table>;

  function expectResult(filterValues: any[], expected: any[] | undefined, done: DoneFn) {
    service.filter(fixture.componentInstance, [], filterValues, 'contains')
      .subscribe(
        result => {
          expect(result?.filteredValue || undefined).toEqual(expected);
          expect(service._value).toBeUndefined();
          done();
        },
        error => done.fail(error)
      );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableFilterService);
    fixture = TestBed.createComponent(Table);
    value = [
      { id: 1, value: 'first' },
      { id: 2, value: 'second' },
      { id: 3, value: 'third' },
      { id: 4, value: 'fourth' },
      { id: 5, value: 'fifth' },
    ];
    fixture.componentInstance.globalFilterFields = ['id', 'value'];
    fixture.componentInstance.value = value;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('filteredValue should be undefined when filterValues is empty', (done) => {
    expectResult([], undefined, done);
  });

  it('filteredValue should be undefined when filterValues items are empty', (done) => {
    expectResult(['', '  '], undefined, done);
  });

  it('should return index [2, 3, 4] when filterValue is ["th"]', (done) => {
    expectResult(['th'], [value[2], value[3], value[4]], done);
  });

  it('should return index [4] when filterValue is ["fth"]', (done) => {
    expectResult(['fth'], [value[4]], done);
  });

  it('should return index [4] when filterValue is ["fth", "th"]', (done) => {
    expectResult(['fth', 'th'], [value[4]], done);
  });

  it('should return index [0] when filterValue is ["rst", "fi"]', (done) => {
    expectResult(['rst', 'fi'], [value[0]], done);
  });

  it('should return empty when filterValue is ["rst", 4]', (done) => {
    expectResult(['rst', 4], [], done);
  });

  it('should return index [3] when filterValue is [4, "th"]', (done) => {
    expectResult([4, 'th'], [value[3]], done);
  });
});

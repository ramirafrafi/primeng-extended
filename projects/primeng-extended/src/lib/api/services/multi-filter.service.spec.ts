import { TestBed } from '@angular/core/testing';

import { MultiFilterService } from './multi-filter.service';

describe('MultiFilterService', () => {
  let service: MultiFilterService;
  let value: any[];

  function expectResult(fields: any[], filterValues: any[], expected: any[], done: DoneFn) {
    service.filter(value, fields, filterValues, 'contains')
      .subscribe(
        result => {
          expect(result).toEqual(expected);
          done();
        },
        error => done.fail(error)
      );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiFilterService);
    value = [
      { id: 1, value: 'first' },
      { id: 2, value: 'second' },
      { id: 3, value: 'third' },
      { id: 4, value: 'fourth' },
      { id: 5, value: 'fifth' },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all items when filterValues is empty', (done) => {
    expectResult(['value'], [], value, done);
  });

  it('should return all items when filterValues items are empty', (done) => {
    expectResult(['value'], ['', '  '], value, done);
  });

  it('should return index [2, 3, 4] when filterValue is ["th"]', (done) => {
    expectResult(['value'], ['th'], [value[2], value[3], value[4]], done);
  });

  it('should return index [4] when filterValue is ["fth"]', (done) => {
    expectResult(['value'], ['fth'], [value[4]], done);
  });

  it('should return index [4] when filterValue is ["th", "fth"]', (done) => {
    expectResult(['value'], ['th', 'fth'], [value[4]], done);
  });

  it('should return index [0] when filterValue is ["fi", "rst"]', (done) => {
    expectResult(['value'], ['fi', 'rst'], [value[0]], done);
  });

  it('should return empty when filterValue is ["rst", 4] (fields: id & value)', (done) => {
    expectResult(['id', 'value'], ['rst', 4], [], done);
  });

  it('should return index [3] when filterValue is ["th", 4] (fields: id & value)', (done) => {
    expectResult(['id', 'value'], ['th', 4], [value[3]], done);
  });

});

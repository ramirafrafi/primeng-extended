import { ComponentFixture } from "@angular/core/testing";
import { AbstractDataComponentFilter, DataComponent } from "../api/classes/abstract-data-component-filter";


export function doTestDataComponentFilter(testArgs: {
    service: AbstractDataComponentFilter<DataComponent>;
    fixture: ComponentFixture<DataComponent>;
    value: any[];
}) {
    function expectResult(filterValues: any[], expected: any[] | undefined, done: DoneFn) {
        let { service, fixture } = testArgs;

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

    it('should be created', () => {
        let { service } = testArgs;

        expect(service).toBeTruthy();
    });

    it('filteredValue should be undefined when filterValues is empty', (done) => {
        expectResult([], undefined, done);
    });

    it('filteredValue should be undefined when filterValues items are empty', (done) => {
        expectResult(['', '  '], undefined, done);
    });

    it('should return index [2, 3, 4] when filterValue is ["th"]', (done) => {
        let { value } = testArgs;

        expectResult(['th'], [value[2], value[3], value[4]], done);
    });

    it('should return index [4] when filterValue is ["fth"]', (done) => {
        let { value } = testArgs;

        expectResult(['fth'], [value[4]], done);
    });

    it('should return index [4] when filterValue is ["fth", "th"]', (done) => {
        let { value } = testArgs;

        expectResult(['fth', 'th'], [value[4]], done);
    });

    it('should return index [0] when filterValue is ["rst", "fi"]', (done) => {
        let { value } = testArgs;

        expectResult(['rst', 'fi'], [value[0]], done);
    });

    it('should return empty when filterValue is ["rst", 4]', (done) => {
        expectResult(['rst', 4], [], done);
    });

    it('should return index [3] when filterValue is [4, "th"]', (done) => {
        let { value } = testArgs;

        expectResult([4, 'th'], [value[3]], done);
    });
};

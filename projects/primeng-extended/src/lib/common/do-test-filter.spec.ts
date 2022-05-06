import { AbstractFilter } from "../api/classes";

export function doTestFilter(testArgs: {
    service: AbstractFilter<any[]>;
    value: any[];
}) {
    function expectResult(fields: any[], filterValues: any[], expected: any[], done: DoneFn) {
        let { service, value } = testArgs;

        service.filter(value, fields, filterValues, 'contains')
            .subscribe(
                result => {
                    expect(result).toEqual(expected);
                    done();
                },
                error => done.fail(error)
            );
    }

    it('should be created', () => {
        let { service } = testArgs;

        expect(service).toBeTruthy();
    });

    it('should return all items when filterValues is empty', (done) => {
        let { value } = testArgs;

        expectResult(['value'], [], value, done);
    });

    it('should return all items when filterValues items are empty', (done) => {
        let { value } = testArgs;

        expectResult(['value'], ['', '  '], value, done);
    });

    it('should return index [2, 3, 4] when filterValue is ["th"]', (done) => {
        let { value } = testArgs;

        expectResult(['value'], ['th'], [value[2], value[3], value[4]], done);
    });

    it('should return index [4] when filterValue is ["fth"]', (done) => {
        let { value } = testArgs;

        expectResult(['value'], ['fth'], [value[4]], done);
    });

    it('should return index [4] when filterValue is ["th", "fth"]', (done) => {
        let { value } = testArgs;

        expectResult(['value'], ['th', 'fth'], [value[4]], done);
    });

    it('should return index [0] when filterValue is ["fi", "rst"]', (done) => {
        let { value } = testArgs;

        expectResult(['value'], ['fi', 'rst'], [value[0]], done);
    });

    it('should return empty when filterValue is ["rst", 4] (fields: id & value)', (done) => {
        expectResult(['id', 'value'], ['rst', 4], [], done);
    });

    it('should return index [3] when filterValue is ["th", 4] (fields: id & value)', (done) => {
        let { value } = testArgs;

        expectResult(['id', 'value'], ['th', 4], [value[3]], done);
    });
}

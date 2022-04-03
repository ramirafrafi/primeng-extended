import { Observable, of } from "rxjs";
import { expand, last, take, tap } from "rxjs/operators";

export abstract class AbstractMultiFilter<T> {
    filter(
        value: T | null,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): Observable<T | null> {
        if (!value) {
            return of(value);
        }

        const args = { value, fields, filterValues, filterMatchMode, filterLocale };
        let stepsCount = this.filterStepsCount(args);

        return of(value)
            .pipe(
                tap(() => this.beforeFilter(args)),
                expand(val => !stepsCount
                    ? of(null)
                    : this.filterStep(val, fields, filterValues[0], filterMatchMode, filterLocale)
                        .pipe(
                            tap(() => filterValues = filterValues.slice(1)),
                            tap(() => stepsCount--)
                        )
                ),
                take(stepsCount--),
                last(),
                tap(() => this.afterFilter(args))
            );
    }

    filterStepsCount(args: {
        value: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): number {
        return args.filterValues.length + 1;
    }

    beforeFilter(args: {
        value: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): void { }

    afterFilter(args: {
        value: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): void { }

    abstract filterStep(
        value: T,
        fields: any[],
        filterValue: any,
        filterMatchMode: string,
        filterLocale?: string
    ): Observable<T>;
}

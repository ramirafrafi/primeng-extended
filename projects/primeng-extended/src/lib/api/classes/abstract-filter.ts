import { Observable, of } from "rxjs";
import { expand, last, take, tap } from "rxjs/operators";

export abstract class AbstractFilter<T> {
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
        let stepsCountPlusOne = this.stepsCount(args) + 1;

        return of(value)
            .pipe(
                tap(() => this.beforeStart(args)),
                expand(val => !stepsCountPlusOne
                    ? of(null)
                    : this.filterStep(val, fields, filterValues[0], filterMatchMode, filterLocale)
                        .pipe(
                            tap(() => filterValues = filterValues.slice(1)),
                            tap(() => stepsCountPlusOne--)
                        )
                ),
                take(stepsCountPlusOne--),
                last(),
                tap(() => this.afterEnd(args))
            );
    }

    stepsCount(args: {
        value: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): number {
        return args.filterValues.length;
    }

    beforeStart(args: {
        value: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): void { }

    afterEnd(args: {
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

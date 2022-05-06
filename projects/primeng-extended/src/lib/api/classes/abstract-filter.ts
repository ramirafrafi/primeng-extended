import { Observable, of } from "rxjs";
import { expand, last, take, tap } from "rxjs/operators";

export abstract class AbstractFilter<T> {
    filter(
        data: T | null,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): Observable<T | null> {
        if (!data) {
            return of(data);
        }

        let stepsCountPlusOne = this.stepsCount(data, fields, filterValues, filterMatchMode, filterLocale) + 1;

        return of(data)
            .pipe(
                tap(() => this.beforeStart(data, fields, filterValues, filterMatchMode, filterLocale)),
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
                tap(() => this.afterEnd(data, fields, filterValues, filterMatchMode, filterLocale))
            );
    }

    stepsCount(
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): number {
        return filterValues.length;
    }

    beforeStart(
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): void { }

    afterEnd(
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): void { }

    abstract filterStep(
        data: T,
        fields: any[],
        filterValue: any,
        filterMatchMode: string,
        filterLocale?: string
    ): Observable<T>;
}

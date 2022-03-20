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
            return of(null);
        }

        return of(value)
            .pipe(
                expand(val => this.filterStep(val, fields, filterValues[0], filterMatchMode, filterLocale)
                    .pipe(
                        tap(() => filterValues = filterValues.slice(1))
                    )
                ),
                take(filterValues.length + 1),
                last()
            );
    }

    abstract filterStep(
        value: T,
        fields: any[],
        filterValue: any,
        filterMatchMode: string,
        filterLocale?: string
    ): Observable<T>;
}

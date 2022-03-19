import { Observable, of } from "rxjs";
import { expand, last, take, tap } from "rxjs/operators";

export abstract class AbstractMultiFilter {
    filter(value: any[], fields: any[], filterValues: any[], filterMatchMode: string, filterLocale?: string): Observable<any[]> {
        if (!value) {
            return of([]);
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

    abstract filterStep(value: any[], fields: any[], filterValue: any, filterMatchMode: string, filterLocale?: string): Observable<any[]>;
}

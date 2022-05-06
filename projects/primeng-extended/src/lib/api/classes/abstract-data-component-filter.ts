import { DataView } from "primeng/dataview";
import { Table } from "primeng/table";
import { AbstractFilter } from "./abstract-filter";

export type DataComponent = Table | DataView;

export abstract class AbstractDataComponentFilter<T extends DataComponent> extends AbstractFilter<T> {
    _value?: any[];

    beforeStart(
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): void {
        this._value = data.value;

        this.resetBeforeStart(data, fields, filterValues, filterMatchMode, filterLocale);
    }

    afterEnd(
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): void {
        data.value = this._value!;
        if (data.filteredValue?.length === data.value?.length) {
            data.filteredValue = null as any;
        }

        this._value = undefined;
    }

    abstract resetBeforeStart(
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string
    ): void;
}

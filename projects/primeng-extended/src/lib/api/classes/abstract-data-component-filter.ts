import { DataView } from "primeng/dataview";
import { Table } from "primeng/table";
import { AbstractFilter } from "./abstract-filter";

export type DataComponent = Table | DataView;

export abstract class AbstractDataComponentFilter<T extends DataComponent> extends AbstractFilter<T> {
    _value?: any[];

    beforeStart(args: {
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): void {
        this._value = args.data.value;

        this.resetBeforeStart(args);
    }

    afterEnd(args: {
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): void {
        args.data.value = this._value!;
        if (args.data.filteredValue?.length === args.data.value?.length) {
            args.data.filteredValue = null as any;
        }

        this._value = undefined;
    }

    abstract resetBeforeStart(args: {
        data: T,
        fields: any[],
        filterValues: any[],
        filterMatchMode: string,
        filterLocale?: string,
    }): void;
}

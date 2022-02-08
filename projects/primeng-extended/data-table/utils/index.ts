import { of } from 'rxjs';
import { ExportConfig } from '../services/export.service';
import { get } from 'lodash';
import { DataTableDirective } from '../directives/data-table.directive';

export function navigate(object: any, path: string | number | symbol | undefined | null) {
    return path ? get(object, path) : object;
}

export function appendExportDate(config?: ExportConfig) {
    return config?.appendDate === true
        ? ` - ${(new Date()).toISOString().split('.')[0].replace(/:/g, '').replace('T', '_')}`
        : '';
}

export function exportData(dataTable: DataTableDirective) {
    !dataTable.table.columns && (dataTable.table.columns = []);
    return of(dataTable.getExportData());
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { appendExportDate, exportData } from '../utils';
import { DataTableDirective } from '../directives/data-table.directive';

export interface ExportData {
  head: any[];
  body: any[];
};

export interface DataFunction {
  (dataTable: DataTableDirective): Observable<ExportData>;
};

export interface ExportConfig {
  dataFn?: DataFunction;
  appendDate?: boolean;
  extras?: any;
};

export interface ExportFunction {
  (dataTable: DataTableDirective, data: ExportData, callback: Function, config?: ExportConfig): any;
};

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  exportFns: Record<string, ExportFunction> = {};

  constructor() {
    this.setupDefault();
  }

  export(dataTable: DataTableDirective, type: string = 'csv', config?: ExportConfig): Observable<any> {
    const fn = this.exportFns[type];

    // If export function is defined,
    // execute it and return an observable of its termination
    if (fn instanceof Function) {
      return new Observable(subscriber => {
        const callback = () => {
          subscriber.next();
          subscriber.complete();
        }

        (config?.dataFn || exportData)(dataTable).subscribe(
          data => fn.bind(this)(dataTable, data, callback, config)
        );
      });
    }

    // Throw error if export function not defined
    const e = `No export function for type "${type}" was found in ExportService, please register an export function for that type.`;
    throw new ReferenceError(e);
  }

  setupDefault() {
    const xlsOrCsv = (
      dataTable: DataTableDirective,
      data: ExportData,
      type: 'xls' | 'csv',
      callback: Function,
      config?: ExportConfig
    ) => {
      const BOOK_TYPE = type === 'xls' ? 'xlsx' : 'csv';
      const FILE_TYPE = type === 'xls'
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        : 'text/csv';
      const FILE_EXTENSION = type === 'xls' ? '.xlsx' : '.csv';

      const map = (arr: any[][]) => arr.map(row => row.map((cell: any) => cell.content || cell));

      import('xlsx').then(XLSX => {
        const worksheet = XLSX.utils.json_to_sheet(
          map(data.head).concat(map(data.body)),
          { skipHeader: true }
        );
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const buffer: any = XLSX.write(workbook, { bookType: BOOK_TYPE, type: 'array' });

        import('file-saver').then(m => {
          const FileSaver = (m as any).default;

          const data: Blob = new Blob([buffer], {
            type: FILE_TYPE
          });
          FileSaver.saveAs(data, `${dataTable.table.exportFilename}${appendExportDate(config)}${FILE_EXTENSION}`);

          callback();
        });
      });
    }

    this.exportFns.csv = (
      dataTable: DataTableDirective,
      data: ExportData,
      callback: Function,
      config?: ExportConfig
    ) => {
      xlsOrCsv(dataTable, data, 'csv', callback, config);
    };

    this.exportFns.xls = (
      dataTable: DataTableDirective,
      data: ExportData,
      callback: Function,
      config?: ExportConfig
    ) => {
      xlsOrCsv(dataTable, data, 'xls', callback, config);
    }

    this.exportFns.pdf = (
      dataTable: DataTableDirective,
      data: ExportData,
      callback: Function,
      config?: ExportConfig
    ) => {
      import('jspdf').then(m => {
        import('jspdf-autotable').then(() => {
          const doc = new m.jsPDF(config?.extras?.doc);
          (doc as any).autoTable({
            head: data.head,
            body: data.body,
            ...config?.extras?.autoTable
          });

          doc.save(`${dataTable.table.exportFilename}${appendExportDate(config)}.pdf`);

          callback();
        });
      });
    };
  }

}

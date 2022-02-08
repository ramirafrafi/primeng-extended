import { ExportConfig, ExportData } from '../services/export.service';
import { ExportService } from '../services/export.service';
import { catchError, tap } from 'rxjs/operators';
import { Directive, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { assign, get } from 'lodash';
import { LazyLoadEvent, MessageService, SortMeta } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, throwError, of } from 'rxjs';
import { DataSourceService } from '../services/data-source.service';
import { appendExportDate, navigate } from '../utils';
import * as download from 'downloadjs';

@Directive({
  selector: 'p-table[peDataTable]'
})
export class DataTableDirective implements OnInit {
  @Input() dataSource?: DataSourceService;
  @Input() options?: Record<string | number | symbol, any>;
  @Input() fetchErrorMessage?: string;
  @Input() fetchErrorSummary?: string;
  @Input() autoLoad = true;
  @Output() valueInit = new EventEmitter();
  @Output() valueLoad = new EventEmitter();

  first?: any;
  rows?: any;
  globalFilter?: any;
  sortMeta?: SortMeta[];

  constructor(
    readonly table: Table,
    readonly message: MessageService,
    readonly exportServ: ExportService
  ) { }

  ngOnInit(): void {
    this._setupTable();
  }

  refresh() {
    this._load();
  }

  export(type: string, fileExtension: string, config?: ExportConfig): Observable<any> {
    if (!this.table.lazy) {
      return this.exportServ.export(this, type, config);
    }

    const options = this._buildOptions();

    const exportParam = this.dataSource?.exportQueryParam;
    exportParam && (options.params[exportParam] = type);

    options.responseType = 'arrayBuffer';

    return this.dataSource?.getAll(options, false).pipe(
      tap(arrayBuffer => download(
        arrayBuffer,
        `${this.table.exportFilename}${appendExportDate(config)}.${fileExtension}`
      ))
    ) || of();
  }

  getExportHead() {
    return [this.table.columns.map(col => ({
      content: col.header,
      styles: col.headStyles || col.styles,
    }))];
  }

  getExportBody() {
    return (this.table.filteredValue || this.table.value).map(
      row => this.table.columns.map(col => ({
        content: get(row, col.field),
        styles: col.bodyStyles || col.styles,
      }))
    );
  }

  getExportData(): ExportData {
    return {
      head: this.getExportHead(),
      body: this.getExportBody(),
    }
  }

  _setupTable() {
    this._init();

    if (this.table.lazy) {
      this.table.onLazyLoad.subscribe(
        (event: LazyLoadEvent) => {
          const { first, rows, globalFilter, multiSortMeta, sortField, sortOrder } = event;

          this.first = first;
          this.rows = rows;
          this.globalFilter = typeof globalFilter === 'string' ? [globalFilter] : globalFilter;
          this.sortMeta = sortField
            ? [{ field: sortField, order: sortOrder } as SortMeta]
            : multiSortMeta;

          this.refresh();
        }
      );
    }
  }

  _init() {
    this.first = this.table.first;
    this.rows = this.table.rows;

    this.autoLoad && this._load(true);
  }

  _buildOptions() {
    const params: any = {};

    if (this.table.paginator && this.table.lazy) {
      const offset = this.dataSource?.offsetQueryParam;
      offset && (params[offset] = this.first);

      const limit = this.dataSource?.limitQueryParam;
      limit && (params[limit] = this.rows);

      if (this.globalFilter?.length > 0) {
        const search = this.dataSource?.searchQueryParam;
        search && (params[search] = this.globalFilter?.join(this.dataSource?.searchSeparator));
      }

      if (this.sortMeta?.length) {
        const sort = this.dataSource?.sortQueryParam;
        sort && (
          params[sort] = this.sortMeta
            .map(({ field, order }) => `${field}:${order > 0 ? 'a' : 'd'}`)
            .join(',')
        );
      }
    }

    const options = assign({}, this.options);
    options.params = assign(options.params, params);

    return options;
  }

  _load(init = false) {
    if (!this.dataSource) {
      return;
    }

    this.table.loading = true;

    const options = this._buildOptions();

    this.dataSource?.getAll(options)
      .pipe(catchError(error => this._toastError(error)))
      .subscribe(
        response => this._readResponse(response, init),
        error => {
          this.table.loading = false;
          throw error;
        }
      );
  }

  _readResponse(response: any, init = false) {
    const changes: SimpleChanges = {};

    changes.value = new SimpleChange(this.table.value, response.value, false);
    this.table.value = response.value;

    if (this.table.paginator && this.table.lazy) {
      this.table.rows = navigate(response, this.dataSource?.limitResponseField);
      this.table.totalRecords = navigate(response, this.dataSource?.totalResponseField);
    }

    this.table.ngOnChanges(changes);

    this.table.loading = false;
    (init ? this.valueInit : this.valueLoad).emit(response.value);
  }

  _toastError(error: Error): Observable<any> {
    this.message.add({
      severity: 'error',
      summary: this.fetchErrorSummary || 'Error',
      detail: this.fetchErrorMessage || 'Error while fetching data.'
    });

    return throwError(error);
  }

}

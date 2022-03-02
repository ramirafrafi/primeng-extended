import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { navigate } from '../utils';
import { keys } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  modelType: Type<any> = Object;
  url?: string;

  // Resource paths
  collectionPath?: string;
  singletonPath?: string;

  // Response fields names
  collectionResponseField = '';
  offsetResponseField = '';
  limitResponseField = '';
  totalResponseField = '';
  returnedResponseField = '';
  singletonResponseField = '';

  // Query params names
  offsetQueryParam = 'offset';
  limitQueryParam = 'limit';
  exportQueryParam = 'export';
  searchQueryParam = 'q';
  sortQueryParam = 's';
  searchSeparator = ';';

  constructor(
    readonly http: HttpClient
  ) { }

  getAll(options: any = {}, withEval = true): Observable<any> {
    const url = this._url(`${this.url}${this.collectionPath}`, options);
    const getAll$ = this.http.get(url, options);
    
    return !withEval ? getAll$ : getAll$.pipe(
      tap((response: any) => response.value = this._collection(response))
    );
  };

  get(id: any, options: any = {}, withEval = true): Observable<any> {
    const url = this._url(`${this.url}${this.singletonPath}`, options);
    const get$ = this.http.get(url.replace(':id', id), options);
    
    return !withEval? get$ : get$.pipe(
      tap((response: any) => response.value = this._singleton(response))
    );
  };

  _singleton(response: any) {
    return new this.modelType(navigate(response, this.singletonResponseField));
  }

  _collection(response: any) {
    return (navigate(response, this.collectionResponseField) as any[]).map(item => new this.modelType(item));
  }

  _url(url: string, options: any = {}) {
    const { pathParams = {} } = options;

    for (let key of keys(pathParams)) {
       url = url.replace(`:${key}`, pathParams[key]);
    }

    return url;
  }

}

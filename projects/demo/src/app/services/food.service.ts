import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(readonly http: HttpClient) { }

  enforcement() {
    return this.http.get('https://api.fda.gov/food/enforcement.json?limit=1000')
      .pipe(
        map((res: any) => res?.results)
      ) as Observable<Food[]>;
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  // returns observable array
  // using observable b/c angular components will subscribe to this method to get results of async call
  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // build array for "Month" dropdown list
    // start at current month & loop until month 12

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    // return object wrap as an observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build array for "Year" dropdown list
    // start at current month & loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    // wrap as an observable
    return of(data);
  }
}

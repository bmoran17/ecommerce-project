import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  // inject HttpClient to make REST calls
  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    // REST API call to get countries
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  
  }

  getStates(theCountryCode: string): Observable<State[]> {
  
    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    // REST API call to get states by country code
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

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

// unwraps JSON from Spring Data REST _embedded entry
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
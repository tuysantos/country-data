import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries(region: string): Observable<Country[]> {
    const strUrl = `${environment.apiEndPoint}/${region}`;
    return this.http.get<Country[]>(strUrl)
        .pipe(
          map( (items: Country[]) => {
            return items;
          }),
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      let errMessage = error.error;
      return Observable.throw(errMessage);
    }
    return Observable.throw(`${error.status} - ${error.error.errors[0].title}`);
  }
}

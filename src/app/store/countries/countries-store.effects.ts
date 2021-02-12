import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryActions } from './countries-store.actions';

@Injectable()
export class CountriesEffects {

    getCountries$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
        ofType(CountryActions.getCountries),
        switchMap((action) =>
            this.countriesService.getCountries(action.payload).pipe(
            map(countries => CountryActions.getCountriesSuccess({ payload: countries })),
            catchError((error: HttpErrorResponse) => of(CountryActions.getCountriesFailure({ error })))
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private countriesService: CountriesService,
    ) {}
}
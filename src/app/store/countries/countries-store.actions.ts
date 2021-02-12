
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Country } from 'src/app/model/country';

export class CountryActions {
    public static getCountries = createAction(
        '[Country Page] Get Countries',
        props<{ payload: string }>()
    );

    public static getCountriesSuccess = createAction(
        '[Country API] Get Countries Success',
        props<{ payload: Country[] }>()
    );

    public static getCountriesFailure = createAction(
        '[Country API] Get Countries Failure',
        props<{ error: HttpErrorResponse }>()
    );
}
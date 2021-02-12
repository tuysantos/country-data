import { Action, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../../model/api.satets';
import { CountryActions } from './countries-store.actions';
import { Country } from 'src/app/model/country';

export interface CountryStoreState {
    countries: Country[];
    apiState: ApiState;
    error: HttpErrorResponse;
};

const initialState: CountryStoreState = {
    countries: [],
    apiState: ApiState.Init,
    error: null,
};

export class CountryStoreReducer {
    public static featureSelectorKey = 'country';

    public static reducer = createReducer(
        initialState,
        on(CountryActions.getCountries, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(CountryActions.getCountriesSuccess, (state, { payload }) => ({
            countries: payload,
            apiState: ApiState.Done,
            error: null,
        })),
        on(
            CountryActions.getCountriesFailure,
            (state, { error }) => ({
                ...state,
                apiState: ApiState.Error,
                error,
            })
        ),
    );
}

export function reducer(state: CountryStoreState, action: Action) {
    return CountryStoreReducer.reducer(state, action);
}
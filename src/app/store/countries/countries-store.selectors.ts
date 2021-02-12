import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryStoreReducer, CountryStoreState } from './countries-store.reducer';

export const countryState = createFeatureSelector(CountryStoreReducer.featureSelectorKey);
export class CountrySelectors {
    
    public static countries = createSelector(
        countryState,
        (state: CountryStoreState) => (state ? state.countries : [])
    );

    public static error = createSelector(
        countryState,
        (state: CountryStoreState) => (state ? state.error : null)
    );

    public static apiState = createSelector(
        countryState,
        (state: CountryStoreState) => (state ? state.apiState : null)
    );
}
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegionStoreReducer, RegionStoreState } from './region-store.reducer';
export const regionState = createFeatureSelector(RegionStoreReducer.featureSelectorKey);
export class RegionSelectors {
    
    public static region = createSelector(
        regionState,
        (state: RegionStoreState) => (state ? state.regions : [])
    );

    public static error = createSelector(
        regionState,
        (state: RegionStoreState) => (state ? state.error : null)
    );

    public static apiState = createSelector(
        regionState,
        (state: RegionStoreState) => (state ? state.apiState : null)
    );
}
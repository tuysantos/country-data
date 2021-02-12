import { Action, createReducer, on } from '@ngrx/store';
import { Region } from "../../model/region";
import { HttpErrorResponse } from '@angular/common/http';
import { RegionActions } from './region-store.actions';
import { ApiState } from '../../model/api.satets';

export interface RegionStoreState {
    regions: Region[];
    apiState: ApiState;
    error: HttpErrorResponse;
};

const initialState: RegionStoreState = {
    regions: [],
    apiState: ApiState.Init,
    error: null,
};

export class RegionStoreReducer {
    public static featureSelectorKey = 'region';

    public static reducer = createReducer(
        initialState,
        on(RegionActions.getRegions, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(RegionActions.getRegionsSuccess, (state, { payload }) => ({
            regions: payload,
            apiState: ApiState.Done,
            error: null,
        })),
        on(
            RegionActions.getRegionsFailure,
            (state, { error }) => ({
                ...state,
                apiState: ApiState.Error,
                error,
            })
        ),
    );
}

export function reducer(state: RegionStoreState, action: Action) {
    return RegionStoreReducer.reducer(state, action);
}
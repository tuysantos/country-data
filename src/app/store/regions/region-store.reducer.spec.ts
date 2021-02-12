import { HttpErrorResponse } from '@angular/common/http';
import { Region } from 'src/app/model/region';
import { ApiState } from '../../model/api.satets';
import { RegionActions } from './region-store.actions';
import { RegionStoreReducer, RegionStoreState } from './region-store.reducer';

describe('RegionStoreReducer', () => {
    const regions: Region[] = [
        { name: 'Asia'},
        { name: 'Europe'}
      ]
  
    const initialState: RegionStoreState = {
        regions: [],
        apiState: ApiState.Init,
        error: null
    };

    it('should create a reducer', () => {
        const result = RegionStoreReducer.reducer(initialState, RegionActions.getRegions);
        expect(result.apiState).toEqual(ApiState.Pending);
    });

    it('should fire getRegionsSuccess action', () => {
        const result = RegionStoreReducer.reducer(
            initialState,
            RegionActions.getRegionsSuccess({
                payload: regions,
            })
        );
        expect(result.regions).toEqual(regions);
    });

    it('should fire getRegionsFailure action', () => {
        const result = RegionStoreReducer.reducer(
            initialState,
            RegionActions.getRegionsFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });
});
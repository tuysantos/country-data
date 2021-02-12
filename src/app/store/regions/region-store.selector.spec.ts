import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../../model/api.satets';
import { Region } from 'src/app/model/region';
import { RegionStoreState } from './region-store.reducer';
import { RegionSelectors } from './region-store.selector';

describe('RegionSelectors', () => {

    const regions: Region[] = [
      { name: 'Asia'},
      { name: 'Europe'}
    ]

    const initialDataState: RegionStoreState = {
        regions: [],
        apiState: ApiState.Init,
        error: null
    };

    const loadedDataState: RegionStoreState = {
        regions,
        apiState: ApiState.Init,
        error: null
    };


    const initialErrorDataState: RegionStoreState = {
        regions: [],
        apiState: ApiState.Init,
        error: undefined,
    };

    const errorDataState: RegionStoreState = {
        regions: [],
        apiState: ApiState.Error,
        error: new HttpErrorResponse({
            headers: null,
            status: 400,
            statusText: 'error',
            url: '',
            error: {
                Errors: [
                    {
                        Code: 'Error occurred',
                        PropertyName: 'my property',
                        PropertyValues: null,
                        Message: 'error in this region',
                    },
                ],
            },
        }),
    };

    it('should returns initial state', () => {
        const regions = RegionSelectors.region.projector(initialDataState);
        expect(regions).toBe(initialDataState.regions);
    });

    it('should returns loaded state', () => {
        const regions = RegionSelectors.region.projector(loadedDataState);
        expect(regions).toBe(loadedDataState.regions);
    });

    it('should returns error state', () => {
        const error = RegionSelectors.error.projector(initialDataState);
        expect(error).toBe(initialDataState.error);
    });

    it('should returns empty list', () => {
        const regions = RegionSelectors.region.projector(initialErrorDataState);
        expect(regions).toEqual([]);
    });

    it('should returns undefined', () => {
        const error = RegionSelectors.error.projector(initialErrorDataState);
        expect(error).toBe(undefined);
    });

    it('should returns error state', () => {
        const error = RegionSelectors.error.projector(errorDataState);
        expect(error.statusText).toBe('error');
    });

    it('should returns apiState', () => {
        const apiState = RegionSelectors.apiState.projector(initialDataState);
        expect(apiState).toBe(initialDataState.apiState);
    });
});
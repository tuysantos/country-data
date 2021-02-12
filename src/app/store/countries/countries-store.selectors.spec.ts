import { HttpErrorResponse } from '@angular/common/http';
import { Country } from 'src/app/model/country';
import { ApiState } from '../../model/api.satets';
import { CountryStoreState } from './countries-store.reducer';
import { CountrySelectors } from './countries-store.selectors';

describe('CountrySelectors', () => {

    const countries: Country[] = [
        {
          name: 'United Kingdom of Great Britain and Northern Ireland',
          capital: 'London',
          population: 65110000,
          currencies:[{ code: 'GBP', name: 'British pound', symbol: '£'}],
          flag: 'https://restcountries.eu/data/gbr.svg'
        },
        {
          name: 'Spain',
          capital: 'Madrid',
          population: 46438422,
          currencies:[{ code: 'EUR', name: 'Euro', symbol: '€'}],
          flag: 'https://restcountries.eu/data/esp.svg'
        },
        {
          name: 'France',
          capital: 'Paris',
          population: 66710000,
          currencies:[{ code: 'EUR', name: 'Euro', symbol: '€'}],
          flag: 'https://restcountries.eu/data/fra.svg'
        }   
      ];

    const initialDataState: CountryStoreState = {
        countries: [],
        apiState: ApiState.Init,
        error: null
    };

    const loadedDataState: CountryStoreState = {
        countries,
        apiState: ApiState.Done,
        error: null
    };

    const initialErrorDataState: CountryStoreState = {
        countries: [],
        apiState: ApiState.Init,
        error: undefined,
    };

    const errorDataState: CountryStoreState = {
        countries: [],
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
                        Message: 'error in this country',
                    },
                ],
            },
        }),
    };

    it('should returns initial state', () => {
        const countries = CountrySelectors.countries.projector(initialDataState);
        expect(countries).toBe(initialDataState.countries);
    });

    it('should returns loaded state', () => {
        const countries = CountrySelectors.countries.projector(loadedDataState);
        expect(countries).toBe(loadedDataState.countries);
    });

    it('should returns error state', () => {
        const error = CountrySelectors.error.projector(initialDataState);
        expect(error).toBe(initialDataState.error);
    });

    it('should returns empty countries', () => {
        const regions = CountrySelectors.countries.projector(initialErrorDataState);
        expect(regions).toEqual([]);
    });

    it('should returns undefined', () => {
        const error = CountrySelectors.error.projector(initialErrorDataState);
        expect(error).toBe(undefined);
    });

    it('should returns error state', () => {
        const error = CountrySelectors.error.projector(errorDataState);
        expect(error.statusText).toBe('error');
    });

    it('should returns apiState', () => {
        const apiState = CountrySelectors.apiState.projector(initialDataState);
        expect(apiState).toBe(initialDataState.apiState);
    });
});
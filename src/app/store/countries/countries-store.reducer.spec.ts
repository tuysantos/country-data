import { HttpErrorResponse } from '@angular/common/http';
import { Country } from 'src/app/model/country';
import { ApiState } from '../../model/api.satets';
import { CountryActions } from './countries-store.actions';
import { CountryStoreReducer, CountryStoreState } from './countries-store.reducer';

describe('CountriesStoreReducer', () => {
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
  
    const initialState: CountryStoreState = {
        countries: [],
        apiState: ApiState.Init,
        error: null
    };

    it('should create a reducer', () => {
        const result = CountryStoreReducer.reducer(initialState, CountryActions.getCountries);
        expect(result.apiState).toEqual(ApiState.Pending);
    });

    it('should fire getCountriesSuccess action', () => {
        const result = CountryStoreReducer.reducer(
            initialState,
            CountryActions.getCountriesSuccess({
                payload: countries,
            })
        );
        expect(result.countries).toEqual(countries);
    });

    it('should fire getCountriesFailure action', () => {
        const result = CountryStoreReducer.reducer(
            initialState,
            CountryActions.getCountriesFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });
});
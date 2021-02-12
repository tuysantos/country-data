import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Country } from 'src/app/model/country';
import { CountriesEffects } from './countries-store.effects';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryActions } from './countries-store.actions';

describe('CountriesEffects', () => {

    let action, countriesService;
    let actions: ReplaySubject<any>;
    const errorMode = new HttpErrorResponse({});

    class CountriesServiceMock {
        getCountries(region: string) {
            return (region === 'Test') ? throwError(new HttpErrorResponse({ error: 'some error occured' })) : of(countriesMock)
        }
    }
    const countriesMock: Country[] = [
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CountriesEffects,
                provideMockActions(() => actions),
                {
                    provide: CountriesService, 
                    useFactory: () => new CountriesServiceMock(),
                },
                HttpClientTestingModule,
            ],
        });
    });

    beforeEach(() => {
        countriesService = TestBed.inject(CountriesService);
        actions = new ReplaySubject(1);
    });

    it('should be created', () => {
        const effects: CountriesEffects = TestBed.inject(CountriesEffects);
        expect(effects).toBeTruthy();
    });

    it('should dispatch getCountriesSuccess', async() => {
        const effects: CountriesEffects = TestBed.inject(CountriesEffects);
        action = CountryActions.getCountries({payload: 'Europe'});
        actions.next(action);
        effects.getCountries$.subscribe(result => {
            expect(result.type).toEqual('[Country API] Get Countries Success');
        });
    });

    it('should dispatch getCountriesFailure', async() => {
        const effects: CountriesEffects = TestBed.inject(CountriesEffects);
        action = CountryActions.getCountries({payload: 'Test'});
        actions.next(action);
        effects.getCountries$.subscribe(result => {
            expect(result.type).toEqual('[Country API] Get Countries Failure');
        });
    });
})

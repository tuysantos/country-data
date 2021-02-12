import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { CountryActions } from 'src/app/store/countries/countries-store.actions';
import { CountryStoreModule } from 'src/app/store/countries/countries-store.module';
import { CountryStoreState } from 'src/app/store/countries/countries-store.reducer';
import { CountryComponent } from './country.component';
import { Country } from 'src/app/model/country';
import { of, throwError } from 'rxjs';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let store: Store<CountryStoreState>;
  let snackBar: MatSnackBar;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryComponent ],
      imports: [CountryStoreModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    snackBar = TestBed.inject(MatSnackBar);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch CountryActions.getCountries', () => {
    const region = 'Europe';
    component.getCountriesByRegion(region);
    const action = CountryActions.getCountries({ payload: region });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should not dispatch CountryActions.getCountries', () => {
    const region = '';
    component.getCountriesByRegion(region);
    const action = CountryActions.getCountries({ payload: region });
    expect(store.dispatch).not.toHaveBeenCalled;
  });

  it('should emit event', () => {
    const result = {
      name: 'France',
      capital: 'Paris',
      population: 66710000,
      currencies:[{ code: 'EUR', name: 'Euro', symbol: '€'}],
      flag: 'https://restcountries.eu/data/fra.svg'
    };

    component.countriesList = countriesMock;
    spyOn(component.countryEvent, 'emit');
    component.selectCountry('France');
    expect(component.countryEvent.emit).toHaveBeenCalledWith(result);
  });

  it('should populate a list of countries', () => {
    component.countries$ = of(countriesMock);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.countriesList).toEqual(countriesMock);
  });

  it('should return an error', () => {
    spyOn(component, 'openSnackBar');
    spyOn(component.countries$, 'pipe').and.callFake(() => {
      return throwError(new Error('Error occured'))
    })
    component.ngOnInit();
    expect(component.openSnackBar).toHaveBeenCalledWith('Error occured', 'Error');
  });
});

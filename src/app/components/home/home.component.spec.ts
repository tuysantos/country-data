import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ApiState } from 'src/app/model/api.satets';
import { Country } from 'src/app/model/country';
import { CountryStoreModule } from 'src/app/store/countries/countries-store.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const country: Country = {
    name: 'United Kingdom of Great Britain and Northern Ireland',
    capital: 'London',
    population: 65110000,
    currencies:[{ code: 'GBP', name: 'British pound', symbol: '£'}],
    flag: 'https://restcountries.eu/data/gbr.svg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [CountryStoreModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display country data', () => {
    component.displayCountryData(country);
    expect(component.country).toEqual(country);
  });

  it('should populate variables', () => {
    component.regionEventTrigger('Europe');
    expect(component.region).toEqual('Europe');
    expect(component.country).toEqual(null);
  });

  it('should have a done state', () => {
    component.apiState$ = of(ApiState.Done);
    component.ngOnInit();
    expect(component.apiState).toEqual(ApiState.Done);
  })
});

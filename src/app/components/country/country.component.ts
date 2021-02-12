import { ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiState } from 'src/app/model/api.satets';
import { Country } from 'src/app/model/country';
import { CountryActions } from 'src/app/store/countries/countries-store.actions';
import { CountryStoreState } from 'src/app/store/countries/countries-store.reducer';
import { CountrySelectors } from 'src/app/store/countries/countries-store.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ICountryDropDown {
  name: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryComponent implements OnInit, OnChanges {

  @Input() region:string;
  @Output() countryEvent: EventEmitter<Country> = new EventEmitter<Country>();

  public countries$ = this.store.select(CountrySelectors.countries);
  public error$ = this.store.pipe(select(CountrySelectors.error));
  public apiState$ = this.store.pipe(select(CountrySelectors.apiState));
  public subscription: Subscription = new Subscription();
  public countriesList: Country[] = [];
  public dropDownList: ICountryDropDown[] = [];
  public selectedCountry: Country;
  public apiState: ApiState = ApiState.Init;

  constructor(
    private store: Store<CountryStoreState>,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.region.currentValue !== '') {
      this.getCountriesByRegion(changes.region.currentValue);
    } else {
      this.dropDownList = [];
    }
    
  }

  ngOnInit(): void {
    this.subscription.add(this.countries$
        .pipe(filter(countries => !! countries))
        .subscribe((countries: Country[]) => {
            this.countriesList = countries;
            this.dropDownList = [];
            countries.forEach(item => {
              this.dropDownList.push({name: item.name})
            });
            this.cdRef.detectChanges();
        }, (err: Error) => {
          this.openSnackBar(err.message, 'Error');
        }));
  }

  getCountriesByRegion(region: string): void {
    if(region && region !== '') {
      this.store.dispatch(CountryActions.getCountries({ payload: region }));
    } else {
      this.dropDownList = [];
    }
  }

  selectCountry(country: string): void {
    this.selectedCountry = this.countriesList.find(item => item.name === country);
    this.countryEvent.emit(this.selectedCountry);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

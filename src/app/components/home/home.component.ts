import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiState } from 'src/app/model/api.satets';
import { Country } from 'src/app/model/country';
import { CountryStoreState } from 'src/app/store/countries/countries-store.reducer';
import { CountrySelectors } from 'src/app/store/countries/countries-store.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public region = '';
  public country: Country;
  public apiState$ = this.store.pipe(select(CountrySelectors.apiState));
  public subscription: Subscription = new Subscription();
  public apiState: ApiState = ApiState.Init;

  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store<CountryStoreState>,
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.apiState$
      .pipe(filter(apiState => !! apiState))
      .subscribe((apiState: ApiState) => {
          this.apiState = apiState;
          this.cdRef.detectChanges();
      }));
  }

  regionEventTrigger(reg: string): void {
    this.region = reg;
    this.country = null;
    this.cdRef.detectChanges();
  }

  displayCountryData(data: Country): void {
    this.country = data;
  }
}

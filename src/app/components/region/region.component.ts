import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Region } from 'src/app/model/region';
import { RegionActions } from 'src/app/store/regions/region-store.actions';
import { RegionStoreState } from 'src/app/store/regions/region-store.reducer';
import { RegionSelectors } from 'src/app/store/regions/region-store.selector';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  @Output() regionEvent: EventEmitter<string> = new EventEmitter<string>();

  public regions$ = this.store.select(RegionSelectors.region);
  public error$ = this.store.pipe(select(RegionSelectors.error));
  public subscription: Subscription = new Subscription();
  public regionList: Region[] = [];
  
  constructor(
    private store: Store<RegionStoreState>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.subscription.add(this.regions$
      .pipe(filter(regions => !! regions))
      .subscribe((regions: Region[]) => {
          this.regionList = regions;
      }, (err: Error) => {
        this.openSnackBar(err.message, 'Error');
      }));

    this.loadRegions();
  }

  loadRegions(): void {
    this.store.dispatch(RegionActions.getRegions());
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  selectRegion(region: string): void {
    this.regionEvent.emit(region);
  }
}

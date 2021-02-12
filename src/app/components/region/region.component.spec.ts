import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Region } from 'src/app/model/region';
import { RegionActions } from 'src/app/store/regions/region-store.actions';
import { RegionStoreModule } from 'src/app/store/regions/region-store.module';
import { RegionStoreState } from 'src/app/store/regions/region-store.reducer';

import { RegionComponent } from './region.component';

describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;
  let store: Store<RegionStoreState>;

  const regionsMock: Region[] = [
    { name: 'Asia'},
    { name: 'Europe'}
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionComponent ],
      imports: [RegionStoreModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event', () => {
    spyOn(component.regionEvent, 'emit');
    component.selectRegion('Europe');
    expect(component.regionEvent.emit).toHaveBeenCalledWith('Europe');
  });

  it('should dispatch an action', () => {
    component.loadRegions();
    const action = RegionActions.getRegions();
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should return regions', () => {
    component.regions$ = of(regionsMock);
    component.loadRegions();
    expect(component.regionList).toEqual(regionsMock);
  });
});

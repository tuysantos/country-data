import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './home.component';

import { RegionEffects } from 'src/app/store/regions/region-store.effects';
import { CountriesEffects } from 'src/app/store/countries/countries-store.effects';
import { CountryStoreReducer } from 'src/app/store/countries/countries-store.reducer';
import { RegionStoreReducer } from 'src/app/store/regions/region-store.reducer';
import { CountryModule } from '../country/country.module';
import { RegionModule } from '../region/region.module';

@NgModule({
declarations: [HomeComponent],
imports: [ CommonModule, MatSnackBarModule,
    StoreModule.forFeature(RegionStoreReducer.featureSelectorKey, RegionStoreReducer.reducer),
    StoreModule.forFeature(CountryStoreReducer.featureSelectorKey, CountryStoreReducer.reducer),
    EffectsModule.forFeature([CountriesEffects]),
    EffectsModule.forFeature([RegionEffects]),
    RegionModule,
    CountryModule
    ],
})
export class HomeModule {}
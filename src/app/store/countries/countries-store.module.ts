import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CountryStoreReducer } from './countries-store.reducer';
import { CountriesEffects } from './countries-store.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(CountryStoreReducer.featureSelectorKey, CountryStoreReducer.reducer),
        EffectsModule.forFeature([CountriesEffects]),
    ],
})

export class CountryStoreModule {}
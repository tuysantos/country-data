import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RegionStoreReducer } from './region-store.reducer';
import { RegionEffects } from './region-store.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(RegionStoreReducer.featureSelectorKey, RegionStoreReducer.reducer),
        EffectsModule.forFeature([RegionEffects]),
    ],
})

export class RegionStoreModule {}
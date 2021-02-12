
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegionRoutingModule } from './region-routing.module';
import { RegionComponent } from './region.component';
import { FormsModule } from '@angular/forms';

@NgModule({
declarations: [RegionComponent],
imports: [ 
    CommonModule,
    FormsModule,
    RegionRoutingModule,
    MatSnackBarModule
],
entryComponents: [RegionComponent],
exports: [RegionComponent],
})
export class RegionModule {}
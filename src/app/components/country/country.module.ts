
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CountryComponent} from './country.component';
import { CountryRoutingModule } from './country-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
declarations: [CountryComponent],
imports: [ 
    CommonModule,
    CountryRoutingModule,
    MatSnackBarModule
],
entryComponents: [CountryComponent],
exports: [CountryComponent],
})
export class CountryModule {}
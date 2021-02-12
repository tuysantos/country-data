import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Region } from '../model/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor() { }

  getRegions(): Observable<Region[]> {
    return of([
      { name: 'Asia'},
      { name: 'Europe'}
    ]);
  }

}

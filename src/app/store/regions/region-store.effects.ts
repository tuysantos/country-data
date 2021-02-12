import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { RegionActions } from './region-store.actions';
import { RegionService } from 'src/app/services/region.service';

@Injectable()
export class RegionEffects {

    getRegions$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
        ofType(RegionActions.getRegions),
        switchMap(action =>
            this.regionService.getRegions().pipe(
            map(regions => RegionActions.getRegionsSuccess({ payload: regions })),
            catchError((error: HttpErrorResponse) => of(RegionActions.getRegionsFailure({ error })))
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private regionService: RegionService,
    ) {}
}
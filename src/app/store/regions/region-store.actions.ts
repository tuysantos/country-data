
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Region } from 'src/app/model/region';

export class RegionActions {
    public static getRegions = createAction(
        '[Region Page] Get Regions',
    );

    public static getRegionsSuccess = createAction(
        '[Region API] Get Regions Success',
        props<{ payload: Region[] }>()
    );

    public static getRegionsFailure = createAction(
        '[Region API] Get Regions Failure',
        props<{ error: HttpErrorResponse }>()
    );
}
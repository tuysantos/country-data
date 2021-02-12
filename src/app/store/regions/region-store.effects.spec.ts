import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Region } from 'src/app/model/region';
import { RegionEffects } from './region-store.effects';
import { RegionService } from 'src/app/services/region.service';
import { RegionActions } from './region-store.actions';

describe('RegionEffects', () => {
    let action, regionService;
    let actions: ReplaySubject<any>;

    const regionsMock: Region[] = [
        { name: 'Asia'},
        { name: 'Europe'}
      ];

    class RegionServiceMock {
        getRegions() {
            return of(regionsMock)
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RegionEffects,
                provideMockActions(() => actions),
                {
                    provide: RegionService, 
                    useFactory: () => new RegionServiceMock(),
                },
                HttpClientTestingModule,
            ],
        });
    });

    beforeEach(() => {
        regionService = TestBed.inject(RegionService);
        actions = new ReplaySubject(1);
    });

    it('should be created', () => {
        const effects: RegionEffects = TestBed.inject(RegionEffects);
        expect(effects).toBeTruthy();
    });

    it('should dispatch getCountriesSuccess', async() => {
        const effects: RegionEffects = TestBed.inject(RegionEffects);
        action = RegionActions.getRegions;
        actions.next(action);
        effects.getRegions$.subscribe(result => {
            expect(result.type).toEqual('[Region API] Get Regions Success');
        });
    });
});
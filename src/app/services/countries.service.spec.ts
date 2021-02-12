import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountriesService } from './countries.service';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;

  const europeMock: Country[] = [
    {
      name: 'United Kingdom of Great Britain and Northern Ireland',
      capital: 'London',
      population: 65110000,
      currencies:[{ code: 'GBP', name: 'British pound', symbol: '£'}],
      flag: 'https://restcountries.eu/data/gbr.svg'
    },
    {
      name: 'Spain',
      capital: 'Madrid',
      population: 46438422,
      currencies:[{ code: 'EUR', name: 'Euro', symbol: '€'}],
      flag: 'https://restcountries.eu/data/esp.svg'
    },
    {
      name: 'France',
      capital: 'Paris',
      population: 66710000,
      currencies:[{ code: 'EUR', name: 'Euro', symbol: '€'}],
      flag: 'https://restcountries.eu/data/fra.svg'
    }   
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CountriesService
      ]
    });
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of data from europe', inject([HttpTestingController, CountriesService],
    (httpMock: HttpTestingController, service: CountriesService) => {
      service.getCountries('europe').subscribe(data => {
        expect(data).toEqual(europeMock);
      });
      const req = httpMock.expectOne(`${environment.apiEndPoint}/europe`);
      expect(req.request.method).toEqual('GET');
      req.flush(europeMock);
  }));
});

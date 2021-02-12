
import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {RequestCacheService} from './request-cache.service';

@Injectable()
export class CachingInterceptor  implements HttpInterceptor {

  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
        setHeaders: {
          'Access-Control-Allow-Credentials' : 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'application/json'
        }
      });

    const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {
console.log('sending the request')
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          event = event.clone({
            headers: event.headers.set('Access-Control-Allow-Origin', '*')
          });
          cache.put(req, event);
        }
      })
    );
  }
}
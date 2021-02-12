import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const maxAge = 30000;
@Injectable({
    providedIn: 'root'
  })
export class RequestCacheService  {

  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    if (!cached) {
      return undefined;
    }
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const newUrl  = this.buildCachedUrl(url);
    const entry = { url, response, lastRead: Date.now() };
    this.cache.forEach(expiredEntry => {
      const oldUrl = this.buildCachedUrl(expiredEntry.url);
      if (newUrl === oldUrl) {
          this.cache.delete(expiredEntry.url);
        }
      });

    this.cache.set(url, entry);
  }

  private buildCachedUrl(url: string): string {
    const temp = url.split('&');
    return `${temp[0]}`;
  }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service'
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  counter = 0;
  constructor(private loader: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    return next.handle(request).pipe(tap(($event: HttpEvent<any>) => {
      if (!$event.type) {
        this.counter++;
      }
      if ($event instanceof HttpResponse) {
        this.counter--;
        if (this.counter <= 0) {
          setTimeout(() => {
            this.loader.hide();
          }, 3000);

        }

      }
    },
      (err) => {
        this.loader.hide();
      }
    ));
  }
}

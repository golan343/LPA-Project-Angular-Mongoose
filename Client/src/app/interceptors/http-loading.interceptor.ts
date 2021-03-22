import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { catchError, tap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  counter = 0;
  constructor(
    private loader: LoaderService,
    private accountService: AccountService
  ) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next
      .handle(request)
      .pipe(tap(this.preloaderChaeck.bind(this)))
      .pipe(catchError(this.preloaderShutDown.bind(this)));
  }
  preloaderChaeck($event: HttpEvent<any>) {
    if (!$event.type) {
      console.log($event);
      this.loader.show();
    }
    if ($event instanceof HttpResponse) {
          this.loader.hide();
    }
  }
  preloaderShutDown(err) {
    this.loader.hide();
  }
}
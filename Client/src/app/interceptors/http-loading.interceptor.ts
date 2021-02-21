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
    ///jwt
    if (this.accountService.isLogin) {
      const token = sessionStorage.getItem('token');
      if(token){
      //  request = request.clone({
      //     headers: request.headers
      //       .set('Content-Type', 'application/json')
      //       .set(
      //         'Authorization',
      //         'Bearer' + token
      //       )
      //   });
      }
      
    }
    ///preloader
    this.loader.show();
    return next
      .handle(request)
      .pipe(tap(this.preloaderChaeck.bind(this)))
      .pipe(catchError(this.preloaderShutDown.bind(this)));
  }
  preloaderChaeck($event: HttpEvent<any>) {
    if (!$event.type) {
      this.counter++;
      this.loader.show();
    }
    if ($event instanceof HttpResponse) {
      this.counter--;
      if (this.counter <= 0) {
        //setTimeout(() => {
          this.loader.hide();
      //  }, 1000);
      }
    }
  }
  preloaderShutDown(err) {
    this.loader.hide();
  }
}

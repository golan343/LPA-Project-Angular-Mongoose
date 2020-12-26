import { AccountService } from './services/account.service';
import {  Injectable } from '@angular/core';
import {   HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private cookieService: CookieService){ }
  // tslint:disable-next-line: typedef
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        if (this.accountService.isLogin) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + JSON.parse(this.cookieService.get('token')))
            });

        }
        return next.handle(authReq);
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public constructor(private accountService: AccountService, private router: Router, private cookieService: CookieService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.cookieService.get('user');
    if (this.accountService.isLogin && user) {
      const role = JSON.parse(user).user.roleId;
        if (role === '5f58ba8855eac12930d7b405' || role === '5f58ba9a55eac12930d7b40c' || role === '5f58badd55eac12930d7b427'){
          return true;
        }
      }
    return false;
    }

}

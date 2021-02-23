import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public constructor(private accountService: AccountService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = sessionStorage.getItem('user');
    if (this.accountService.isLogin && user) {
      return true;
    }
    return false;
  }

}

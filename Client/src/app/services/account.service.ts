import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../environments/environment';
import { UserModel } from '../models/user-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public user: UserModel;
  public helper = new JwtHelperService();
  public decodedToken: any;
  isLoginSubject = new BehaviorSubject<boolean>(false);
  isLogin: boolean;
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }
  public getUserId(): string {
    const _id = JSON.parse(this.cookieService.get('user')).user._id;
    return _id;
  }
  public isUserLoggedIn(): void {
    const token = this.cookieService.get('token');
    this.isLogin = !this.helper.isTokenExpired(token);
    console.log(this);
    this.isLoginSubject.next(this.isLogin)
  }
  public getToken(): string {
    return this.cookieService.get('token');
  }

  public getUser(): UserModel {
    return JSON.parse(this.cookieService.get('user'));
  }

  public isAdmin(): boolean {
    if (this.isLogin) {
      const role = JSON.parse(this.cookieService.get('user')).user.roleId;
      if (role === '5f58ba8855eac12930d7b405' || role === '5f58ba9a55eac12930d7b40c' || role === '5f58badd55eac12930d7b427'){
        return true;
      }
      else{
        return false;
      }
    }
    return false;

  }

  // tslint:disable-next-line: typedef
  public login(user: UserModel) {
    return this.http.post<UserModel>(`${BaseUrl}api/auth/login`, user)
    // tslint:disable-next-line: no-shadowed-variable
    .pipe(map(user => {
      this.cookieService.set('token', JSON.stringify(user.token));
      this.cookieService.set('user', JSON.stringify(user));
      return user;
    }));
  }

  public logout(): void {
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/home');
  }


  public addUser(user: UserModel): Promise<any> {
    return this.http.post<UserModel>(`${BaseUrl}api/auth/register`, user).toPromise();
  }
}

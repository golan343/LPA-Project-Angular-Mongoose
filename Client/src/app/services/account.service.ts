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

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public isUserLoggedIn(): any {
    const token = this.cookieService.get('token');
    return !this.helper.isTokenExpired(token);
  }
  public getToken(): string {
    return this.cookieService.get('token');
  }

  public getUser(): UserModel {
    return JSON.parse(this.cookieService.get('user'));
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

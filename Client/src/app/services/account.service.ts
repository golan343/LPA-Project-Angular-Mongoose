import { CookieService } from 'ngx-cookie-service';
import { BaseUrl } from '../../environments/environment';
import { UserModel } from '../models/user-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
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
  img:string;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }
  public getUserId(): string {
    const _id = JSON.parse(this.cookieService.get('user')).user._id;
    return _id;
  }
  public isUserLoggedIn(): void {
    const token = sessionStorage.getItem('token');
    this.isLogin = !this.helper.isTokenExpired(token);
    this.user = this.getUser();
    this.user.isAdmin = this.user.roleId ? this.checkIsAdmin(this.user.roleId) : false;
    this.isLoginSubject.next(this.isLogin)
  }
  public getToken(): string {
    return this.cookieService.get('token');
  }

  public getUser(): any | UserModel {
    let user = this.cookieService.get('user');
    if (!user) {
      return {};
    }
    return JSON.parse(user) as UserModel;
  }
  getUserIcon(){
    return sessionStorage.getItem('userImage');
  }
  checkIsAdmin(roleId) {
    switch (roleId) {
      case '5f58ba8855eac12930d7b405':
      case '5f58ba9a55eac12930d7b40c':
      case '5f58badd55eac12930d7b427':
        return true;
    }
    return false;
  }
  login(user: UserModel): Observable<{user:UserModel,token:string}> {
    return this.http.post<{user:UserModel,token:string}>(`${BaseUrl}api/auth/login`, user);
  }
  setLoginUser(user:UserModel, token){
  sessionStorage.setItem('token', token);
  if(user){
    if(user.img){
      sessionStorage.setItem('userImage',user.img);
      this.img = user.img;
      delete user.img;
    }
  }
  this.cookieService.set('user', JSON.stringify(user));
  this.isUserLoggedIn();
  return user;
}
  public logout(): void {
    this.cookieService.deleteAll();
    sessionStorage.clear();
    this.isUserLoggedIn();
  }
  changePassword(id: string, old: string, password: string): Promise<any> {
    return this.http
      .post<any>(BaseUrl + 'api/auth/reset', { id, old, password })
      .toPromise();
  }

  public addUser(user: UserModel): Promise<any> {
    return this.http.post<UserModel>(`${BaseUrl}api/auth/register`, user).toPromise();
  }

  public resetPassword(email: string): Observable<any> {
    return this.http.post(`${BaseUrl}api/auth/reset-password`, { email });
  }

  public updatePassword(token: string, password: string): Observable<any> {
    return this.http.patch(`${BaseUrl}api/auth/new-password/${token}`, {token, password});
  }
  editUser(user: UserModel): Observable<any> {
    return this.http
      .patch<any>(BaseUrl + 'api/auth/updateUser/' + user._id, user)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}

import { BaseUrl, environment } from '../../environments/environment';
import { UserImageRespone, UserModel } from '../models/user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { stringify } from '@angular/compiler/src/util';

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
  img: string;
  constructor(private http: HttpClient) { }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }
  public isUserLoggedIn(): void {
    const token = sessionStorage.getItem('token');
    this.isLogin = !this.helper.isTokenExpired(token);
    this.user = this.getUser();
    this.user.isAdmin = this.user.roleId ? this.checkIsAdmin(this.user.roleId) : false;
    this.isLoginSubject.next(this.isLogin)
  }
  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public getUser(): any | UserModel {
    const user = sessionStorage.getItem('user');
    if (!user) {
      return {};
    }
    return JSON.parse(user) as UserModel;
  }
  getUserIcon(userId: string): Observable<UserImageRespone> {
    const base64StringImg = sessionStorage.getItem('userImage');
    if (!base64StringImg) {
      return this.http
        .get<UserImageRespone>(environment.BaseUrl + 'api/auth/userImage/' + userId)
        .pipe(tap(result => {
          if (result)
            sessionStorage.setItem('userImage', result.base64StringImg);
        }));

    }
    const result = { userId, base64StringImg }
    return of(result);
  }
  saveUserImage(id: string, img: string): Observable<any> {
    return this.http.post<any>(environment.BaseUrl + 'api/auth/setUserImage', {
      id,
      img,
    });
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
  login(user: UserModel): Observable<{ user: UserModel, token: string }> {
    return this.http.post<{ user: UserModel, token: string }>(`${BaseUrl}api/auth/login`, user);
  }
  setLoginUser(user: UserModel, token:string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.isUserLoggedIn();
    return user;
  }
  public logout(): void {
    sessionStorage.clear();
    location.reload();
  }
  changePassword(id: string, old: string, password: string): Promise<any> {
    return this.http
      .post<any>(BaseUrl + 'api/auth/reset', { id, old, password })
      .toPromise();
  }

  public addUser(user: UserModel): Observable<{ addedUser:UserModel, token:string }> {
    return this.http.post<{ addedUser:UserModel, token:string }>(`${BaseUrl}api/auth/register`, user);
  }

  public resetPassword(email: string): Observable<any> {
    return this.http.post(`${BaseUrl}api/auth/reset-password`, { email });
  }

  public updatePassword(token: string, password: string): Observable<any> {
    return this.http.patch(`${BaseUrl}api/auth/new-password/${token}`, { token, password });
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

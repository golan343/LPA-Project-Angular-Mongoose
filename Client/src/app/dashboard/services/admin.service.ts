import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { userItem } from '../model/user-item';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  errorSubject = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<userItem[]> {
    return this.http.get<any>(environment.BaseUrl + 'api/auth/usersList').pipe(
      map((res) => {
        return Object.values(res);
      })
    );
  }

  deleteUser(id: string): Observable<{
    id;
    n: 1;
    ok: 1;
    deletedCount: 1;
  }> {
    return this.http
      .delete<{
        id: string;
        n: 1;
        ok: 1;
        deletedCount: 1;
      }>(environment.BaseUrl + 'api/auth/deleteUser/' + id)
      .pipe(
        map((res) => {
          res.id = id;
          return res;
        })
      );
  }
  editUser(user: userItem): Observable<any> {
    return this.http.patch<any>(environment.BaseUrl + 'api/auth/updateUser/' + user._id, user).pipe(map(res => {
      return res;
    }))
  }
}

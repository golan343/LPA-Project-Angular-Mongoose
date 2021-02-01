import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { catchError, map, tap } from 'rxjs/operators';
import { Auction, AuctionModel } from 'src/app/models/auction-model';
import { BidModel } from 'src/app/models/bid-model';
import { UserModel } from 'src/app/models/user-model';
import { environment } from 'src/environments/environment';
import { userItem } from '../model/user-item';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  errorSubject = new BehaviorSubject<string>('');
  componentNumberSubject = new Subject<number>();
  AuctionsSubject = new Subject<Auction[]>();
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<userItem[]> {
    return this.http.get<any>(environment.BaseUrl + 'api/auth/usersList').pipe(
      map((res) => {
        return Object.values(res);
      })
    );
  }
  resetPassword(id: string, old: string, password: string): Promise<any> {
    return this.http
      .post<any>(environment.BaseUrl + 'api/auth/reset', { id, old, password })
      .toPromise();
  }
  deleteUser(
    id: string
  ): Observable<{
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
    return this.http
      .patch<any>(environment.BaseUrl + 'api/auth/updateUser/' + user._id, user)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getAllUsersBids(): Observable<BidModel[]> {
    return this.http.get<BidModel[]>(environment.BaseUrl + 'api/bids').pipe(
      map((bids) => {
        return bids;
      })
    );
  }
  getAllAuction(): Observable<Auction[]> {
    return this.http.get<Auction[]>(environment.BaseUrl + 'api/auctions/all');
  }
  saveUserImage(id: string, img: string): Observable<any> {
    return this.http.post<any>(environment.BaseUrl + 'api/auth/setUserImage', {
      id,
      img,
    });
  }
  getUserImage(id: string): Observable<{ _id: string; img: string }> {
    return this.http
      .get<{ _id: string; img: string }>(
        environment.BaseUrl + 'api/auth/userImage/' + id
      )
      .pipe(
        tap((result) => {
          sessionStorage.setItem('userImage', result.img);
        })
      );
  }

  updateAuction(
    auction: Auction
  ): Observable<{
    msg:string
  }> {
    return this.http.patch<{
      msg:string
    }>(`${environment.BaseUrl}api/auctions/${auction._id}`, auction);
  }
  uploadImage(formData:FormData):Observable<any>{
    return this.http.post(environment.BaseUrl+'api/upload-image',formData,{ responseType: 'text' })
  }
}

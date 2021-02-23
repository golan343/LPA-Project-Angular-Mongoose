import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { catchError, map, tap } from 'rxjs/operators';
import { Auction, AuctionModel } from 'src/app/models/auction-model';
import { BidModel } from 'src/app/models/bid-model';
import { pageModel } from 'src/app/models/page';
import { UserModel } from 'src/app/models/user-model';
import { environment } from 'src/environments/environment';
import { auctionItem } from '../model/auctionItem';
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
  editUser(user: UserModel): Observable<any> {
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
  getUserImage(id: string): Observable<{ userId: string; base64StringImg: string }> {
    return this.http
      .get<{ userId: string; base64StringImg: string }>(
        environment.BaseUrl + 'api/auth/userImage/' + id
      )
      .pipe(
        tap((result) => {
          sessionStorage.setItem('userImage', result.base64StringImg);
        })
      );
  }
  addNewAuction(auction:auctionItem):Observable<{ n: 1;
    ok: 1;}>{
    return  this.http.post<{ n: 1;
      ok: 1;}>(`${environment.BaseUrl}api/auctions`,{...auction})
  }
  updateAuction(
    auction: auctionItem
  ): Observable<{
    msg:string
  }> {
    return this.http.patch<{
      msg:string
    }>(`${environment.BaseUrl}api/auctions/${auction._id}`, auction);
  }
  deleteAuction(
    auctionId: string
  ): Observable<any> {
    return this.http.delete<any>(`${environment.BaseUrl}api/auctions/${auctionId}`);
  }
  uploadImage(formData:FormData):Observable<any>{
    return this.http.post(environment.BaseUrl+'api/upload-image',formData,{ responseType: 'text' })
  }
  AuctiontoArcaiv(id:string):Observable<{n:number,ok:string}>{
    return this.http.put<{n:number,ok:string}>(environment.BaseUrl+'api/auctions/setarcive/'+id,{id});
  }
  pageUpdate(p:pageModel):Observable<any>{
    return this.http.put<any>(environment.BaseUrl+'api/page',{urlName:p.urlName,title:p.title,content:p.content});
  }

  getAllRoles():Observable<any> {
    return this.http.get(`${environment.BaseUrl}api/role`);
  }
}

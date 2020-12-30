import { BaseUrl } from './../../environments/environment';
import { store } from './../redux/store';
import { ActionType } from './../redux/action-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionModel } from '../models/auction-model';
import { Action } from '../redux/action';
//import { BidsService } from './bids.service';
import { Observable, Subject } from 'rxjs';
import { BidModel } from '../models/bid-model';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {
  subjectAuctions = new Subject<AuctionModel[]>();
  constructor(private http: HttpClient) { }

  public addAuctionToServer(auction: AuctionModel): Promise<void> {
    return this.http
      .post<AuctionModel>(BaseUrl + 'api/auctions', auction)
      .toPromise().then(res => {
      }).catch(err => {
        console.log(err); // דיווח כשלון
      });
  }

  // tslint:disable-next-line: typedef
  getAllAuctions() {
    this.http
    .get<AuctionModel[]>(BaseUrl + 'api/auctions')
      .subscribe(AuctionsResult => {
        this.subjectAuctions.next(AuctionsResult);
      // const action: Action = { type: ActionType.GetAllAuctions, payload: res };
      // store.dispatch(action);
    }, err => {
        console.log(err.message);
    });
  }
  public getAllOpenedAuctions(): void {
    this.http
    .get<AuctionModel[]>(BaseUrl + 'api/auctions/get/opened')
    .subscribe(res => {
      const action: Action = { type: ActionType.GetAllOpenedAuctions, payload: res };
      store.dispatch(action);
    }, err => {
        console.log(err.message);
    });
  }
  public async getAllClosedAuctions(): Promise<any> {
    await this.http
    .get<AuctionModel[]>(BaseUrl + 'api/auctions/get/closed')
    .subscribe(res => {
      const action: Action = { type: ActionType.GetAllClosedAuctions, payload: res };
      store.dispatch(action);
    }, err => {
        console.log(err.message);
    });
  }


  // tslint:disable-next-line: variable-name
  getAuction(_id: string): Observable<AuctionModel> {
    return this.http.get<AuctionModel>(BaseUrl + 'api/auctions/' + _id)
      .pipe(map(res => {
        this.subjectAuctions.next([res]);
        return res;
      }));
  }
  getLastAuction(): Observable<AuctionModel[]> {
    return this.http.get<AuctionModel[]>(BaseUrl + 'api/auctions/get/last');
    // .subscribe(async res => {
    //   // const action: Action = { type: ActionType.GetLastAuction, payload: res };
    //   // store.dispatch(action);
    // },
    // err => {
    //   console.log(err.message);
    // });
  }
  getBidsAuction(auctionId: string): Observable<any> {
    return this.http.get(`/join/bids-in-auction/${auctionId}`);
  }

  public async updateAuction(auction: AuctionModel): Promise<any>{
    await this.http.patch<AuctionModel>(`${BaseUrl}api/auctions/${auction._id}`, auction)
    .subscribe(updatedAuction => {

    });
  }
}

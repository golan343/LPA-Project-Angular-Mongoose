import { BaseUrl } from './../../environments/environment';
import { store } from './../redux/store';
import { ActionType } from './../redux/action-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionModel } from '../models/auction-model';
import { Action } from '../redux/action';
import { BidsService } from './bids.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

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
  public getAllAuctions() {
    this.http
    .get<AuctionModel[]>(BaseUrl + 'api/auctions')
    .subscribe(res => {
      const action: Action = { type: ActionType.GetAllAuctions, payload: res };
      store.dispatch(action);
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
  public getAuction(_id: string): void {
    this.http.get<AuctionModel>(BaseUrl + 'api/auctions/' + _id)
    .subscribe(res => {
      const action: Action = { type: ActionType.GetOneAuction, payload: res };
      store.dispatch(action);
    },
    err => {
      console.log(err.message);
    });
  }
  public getLastAuction(): void {
    this.http.get<AuctionModel>(BaseUrl + 'api/auctions/get/last')
    .subscribe(async res => {
      const action: Action = { type: ActionType.GetLastAuction, payload: res };
      store.dispatch(action);
    },
    err => {
      console.log(err.message);
    });
  }

  public async updateAuction(auction: AuctionModel): Promise<any>{
    await this.http.patch<AuctionModel>(`${BaseUrl}api/auctions/${auction._id}`, auction)
    .subscribe(updatedAuction => {
      const action: Action = { type: ActionType.UpdateAuction, payload: updatedAuction };
      store.dispatch(action);
    });
  }
}

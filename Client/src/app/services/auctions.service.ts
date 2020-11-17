import { BaseUrl } from './../../environments/environment';
import { store } from './../redux/store';
import { ActionType } from './../redux/action-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionModel } from '../models/auction-model';
import { Action } from '../redux/action';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  constructor(private http: HttpClient) { }

  public addAuctionToServer(auction: AuctionModel): Promise<undefined> {
    return new Promise<undefined>((resolve, reject) => {
        this.http
            .post<AuctionModel>(BaseUrl + 'api/auctions', auction)
            .subscribe(res => {
                const action: Action = { type: ActionType.AddAuction, payload: res };
                store.dispatch(action);
                resolve(); // דיווח הצלחה
            }, err => {
                reject(err); // דיווח כשלון
            });
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
}

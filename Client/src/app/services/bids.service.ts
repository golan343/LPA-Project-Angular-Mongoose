import { store } from './../redux/store';
import { Action } from './../redux/action';
import { BaseUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BidModel } from '../models/bid-model';
import { ActionType } from '../redux/action-type';

@Injectable({
  providedIn: 'root'
})
export class BidsService {

  constructor(private http: HttpClient) { }

  public getAllBidsIncludingAuction(auctionId): void {
    this.http.get<BidModel[]>(`${BaseUrl}/api/bids/join/bids-in-auction/${auctionId}`)
    .subscribe(bids => {
      const action: Action = { type: ActionType.GetBidsIncludingSpecificAuction, payload: bids };
      store.dispatch(action);
    });
  }

  public addBid(bid: BidModel) {
    this.http.post<BidModel>(`${BaseUrl}/api/bids`, bid)
      .subscribe(addedBid => {
        const action: Action = { type: ActionType.AddBid, payload: addedBid };
        store.dispatch(action);
      },
      err => {
        console.log(err.message);
      });
  }


}

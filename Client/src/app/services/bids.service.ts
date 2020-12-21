import { store } from './../redux/store';
import { Action } from './../redux/action';
import { BaseUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BidModel } from '../models/bid-model';
import { ActionType } from '../redux/action-type';
import { Subject } from 'rxjs';
import { BidiModule } from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  subjectBidList = new Subject<BidModel[]>();
  subjectBidsInAuction = new Subject<BidiModule[]>();
  constructor(private http: HttpClient) { }

  public getAllBidsIncludingAuction(auctionId): void {
    this.http.get<BidModel[]>(`${BaseUrl}api/bids/join/bids-in-auction/${auctionId}`)
      .subscribe(bids => {
        this.subjectBidsInAuction.next(bids);
      // const action: Action = { type: ActionType.GetBidsIncludingSpecificAuction, payload: bids };
      // store.dispatch(action);
    });
  }

  public addBid(bid: BidModel): void {
    this.http.post<BidModel>(`${BaseUrl}api/bids`, bid)
      .subscribe(addedBid => {
        const action: Action = { type: ActionType.AddBid, payload: addedBid };
        store.dispatch(action);
      },
      err => {
        console.log(err.message);
      });
  }

  public getAllBids(): Promise<BidModel[] | any> {
    return this.http.get<BidModel[]>(`${BaseUrl}api/bids`)
      .toPromise().then(bids => {
        this.subjectBidList.next(bids);
        // const action: Action = { type: ActionType.GetAllBids, payload: bids };
        // store.dispatch(action);
      }).catch((err) => { console.log(err); });
  }


}

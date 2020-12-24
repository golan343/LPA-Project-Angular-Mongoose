import { store } from './../redux/store';
import { Action } from './../redux/action';
import { BaseUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BidModel } from '../models/bid-model';
import { ActionType } from '../redux/action-type';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BidsService {
  subjectBidList = new Subject<BidModel[]>();
  subjectBidsInAuction = new Subject<BidModel[]>();
  constructor(private http: HttpClient) { }

  public getAllBidsIncludingAuction(auctionId): void {
     this.http.get<BidModel[]>(`${BaseUrl}api/bids/join/bids-in-auction/${auctionId}`)
      .subscribe(bids => {
        this.subjectBidsInAuction.next(bids);
    });
  }
  getBidDetails(id: string) {
    return this.http.get(`${BaseUrl}api/bid/${id}`).pipe(map(result => {

      return {
        ...result,
        id
      }
    }));
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

  public getAllBids(): Promise<BidModel[] | any | any> {
    return this.http.get<BidModel[]>(`${BaseUrl}api/bids`)
      .toPromise().then(bids => {
        this.subjectBidList.next(bids);
        // const action: Action = { type: ActionType.GetAllBids, payload: bids };
        // store.dispatch(action);
      }).catch((err) => { console.log(err); });
  }


}

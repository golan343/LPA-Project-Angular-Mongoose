import { store } from './../redux/store';
import { Action } from './../redux/action';
import { BaseUrl, environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BidModel } from '../models/bid-model';
import { ActionType } from '../redux/action-type';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BidsService {
  subjectBidList = new Subject<BidModel[]>();
  subjectBidsInAuction = new Subject<BidModel[]>();
  constructor(private http: HttpClient) { }

  public getAllBidsIncludingAuction(auctionId: string): void {
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
  public addBid(bid: BidModel): Observable<any> {
    return this.http.post<BidModel>(`${BaseUrl}api/bids`, bid);
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

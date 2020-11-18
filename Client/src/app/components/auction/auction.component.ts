import { BidsService } from './../../services/bids.service';
import { BidModel } from './../../models/bid-model';
import { BaseUrl } from './../../../environments/environment';
import { store } from './../../redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { Unsubscribe } from 'redux';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  public auction: AuctionModel;
  public unsubscribe: Unsubscribe;
  public BaseUrl = BaseUrl;
  public bid = new BidModel();
  public bids: BidModel[];


  constructor( private activatedRoute: ActivatedRoute, private cookieService: CookieService, private bidService: BidsService  ) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    try{
      const _id = this.activatedRoute.snapshot.params._id;
      this.auction = store.getState().auctions.find(a => a._id === _id);
      this.bid.auctionId = _id;
      // -----------------
      this.bids = store.getState().bids;
      await this.bidService.getAllBidsIncludingAuction(_id);
    }
    catch (err) {
      alert(err.message);
    }

    
  }

  public setAmount(event): void {
    this.bid.offer = event;
  }

  public async addBid(): Promise<any> {
    this.bid.userId = JSON.parse(this.cookieService.get('user')).user._id;
    this.bid.date = new Date();
    console.log(this.bid);
    await this.bidService.addBid(this.bid);
  }

}

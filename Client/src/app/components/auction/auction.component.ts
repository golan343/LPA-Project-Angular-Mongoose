import { BidModel } from './../../models/bid-model';
import { BaseUrl } from './../../../environments/environment';
import { store } from './../../redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { Unsubscribe } from 'redux';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  public auction: AuctionModel;
  public unsubscribe: Unsubscribe;
  public BaseUrl = BaseUrl;
  public bidValue;
  public bid = new BidModel();


  constructor( private activatedRoute: ActivatedRoute ) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    try{
      const _id = this.activatedRoute.snapshot.params._id;
      this.auction = store.getState().auctions.find(a => a._id === _id);
    }
    catch (err) {
      alert(err.message);
    }

  }

  public setAmount(event): void {
    this.bidValue = event;
  }

  public addBid(): void {
    console.log(this.bidValue);
  }

}

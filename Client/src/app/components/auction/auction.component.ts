import { BidsService } from './../../services/bids.service';
import { BidModel } from './../../models/bid-model';
import { BaseUrl } from './../../../environments/environment';
import { store } from './../../redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { Unsubscribe } from 'redux';
import { CookieService } from 'ngx-cookie-service';
import * as CanvasJS from '../../../assets/canvasjs.min';


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

  public showBids(): void {
    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: 'Bids in our auction'
      },
      data: [{
        type: 'bar',
        dataPoints: [
          { y: 0.1, label: "Apple" },
          { y: 0.2, label: "Mango" },
          { y: 0.3, label: "Orange" },
          { y: 0.4, label: "Banana" },
          { y: 0.5, label: "Pineapple" },
          { y: 1, label: "Pears" },
          { y: 1.2, label: "Grapes" },
          { y: 3.1, label: "Lychee" },
          { y: 100, label: "Lychee" },
          { y: 4.5, label: "Jackfruit" }
        ]
      }]
    });
    chart.render();

  }

}

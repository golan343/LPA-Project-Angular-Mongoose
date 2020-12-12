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
import { AccountService } from 'src/app/services/account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateStatusComponent } from '../update-status/update-status.component';


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
  public setDataPoints = [];
  public bidOfferUnique;
  public unique;
  public highest;
  public common;



  constructor(
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private bidService: BidsService,
    private accountService: AccountService,
    private dialog: MatDialog  ) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    try{
      const _id = this.activatedRoute.snapshot.params._id;
      this.auction = store.getState().auctions.find(a => a._id === _id);
      this.bid.auctionId = _id;
      // -----------------
      await this.bidService.getAllBidsIncludingAuction(_id);
      this.unsubscribe = store.subscribe(() => this.bids = store.getState().bids);
      setTimeout(() => {
        this.checkUnique();
      }, 500);
      //
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
    await this.bidService.addBid(this.bid);
  }

  public checkUnique() {
    if(this.bids.length > 0){
      let uniqueValue = 1000;
      let highestValue = 0;
      let commonValue = 0;
      for (let i = 1; i <= 100; i++) {
        const bidOffer = i / 100;
        const value = this.bids.filter(b => +b.offer === bidOffer).length;

        if (value > 0){ 
          if(value < uniqueValue){
            uniqueValue = value;
            this.bidOfferUnique = bidOffer;
          }
          if(bidOffer > highestValue){
            highestValue = bidOffer;
          }
        }
        if (value > commonValue){
          commonValue = value;
          this.common = bidOffer;
        }
      }
      this.unique = this.bids.find(b => b.offer === `${this.bidOfferUnique}`);
      this.highest = this.bids.find(b => b.offer === `${highestValue}`);
      console.log(this.unique);
    }
    return;
  }

  public showBids(): void {
    this.setDataPoints = [];
    for (let i = 1; i <= 100; i++) {
      const bidOffer = i / 100;
      const obj = {
        label: `Bid: ` + bidOffer,
        y: this.bids.filter(b => +b.offer === bidOffer).length
      };
      if (obj.y > 0){
        this.setDataPoints.push(obj);
      }


    }

    const chart = new CanvasJS.Chart('chartContainer', {
      axisY: {
			labelAutoFit: true,   // change it to false
			prefix: 'Bidders: '
      },
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: 'Bids in our auction'
      },
      data: [{
        type: 'bar',
        // yValueFormatString:"count ####",
        // axisYType: 'secondary',
        dataPoints: this.setDataPoints
      }]
    });
    chart.render();

  }
  

  public updateStatusDialog(): void {
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      panelClass: 'custom-dialog-container',
      width: '450px',
      height: '300px',
      data: this.auction
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

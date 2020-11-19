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
    console.log(this.bids);
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: 'Bids in our auction'
      },
      data: [{
        type: 'bar',
        dataPoints: [
          { y: +this.bids[0].offer, label: 'Apple' },
          { y: +this.bids[1].offer, label: 'Apple' },
          { y: +this.bids[2].offer, label: 'Apple' },
          { y: +this.bids[3].offer, label: 'Apple' },
          { y: +this.bids[4].offer, label: 'Apple' },
          { y: +this.bids[5].offer, label: 'Apple' },
          { y: +this.bids[6].offer, label: 'Apple' },
          { y: +this.bids[7].offer, label: 'Apple' }
        ]
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

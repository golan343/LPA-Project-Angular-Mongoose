import { BidsService } from './../../services/bids.service';
import { BidModel } from './../../models/bid-model';
import { environment } from './../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { CookieService } from 'ngx-cookie-service';
import * as CanvasJS from '../../../assets/canvasjs.min';
import { AuctionsService } from 'src/app/services/auctions.service';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { DialogService } from 'src/app/ui/dialog.service';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  auction: AuctionModel;
  bid = new BidModel();
  bids: BidModel[];
  setDataPoints = [];

  price: number;



  constructor(
    private activatedRoute: ActivatedRoute,
    private auctionService: AuctionsService,
    private cookieService: CookieService,
    private bidService: BidsService,
    private dialogService: DialogService,
    private auctionsService: AuctionsService) { }

  async ngOnInit() {
    try {

      const id = this.activatedRoute.snapshot.params._id;
      this.auctionService.getAuction(id).toPromise();
      this.auctionService.subjectAuctions.subscribe(auctions => {
        this.auction = auctions.map(auc => {
          return {
            ...auc,
            imageFileName: environment.BaseUrl + 'uploads/' + auc.imageFileName
          }
        })[0];
        this.price = parseFloat(this.auction.price);
      });

    }
    catch (err) {
      alert(err.message);
    }
  }

  setAmount(event): void {
    this.bid.offer = event.target.value;
  }

  async addBid(): Promise<any> {
    const dialog = new DialogData();
    dialog.show = true;
    this.bid.userId = JSON.parse(this.cookieService.get('user')).user._id;
    this.bid.date = new Date();
    this.bidService.addBid(this.bid).subscribe(result => {
      console.log(result)
      dialog.title = 'Your bid is absorbed in our system!';
      dialog.text = 'see you in the next auction!';
      this.dialogService.subjectType.next(dialog);
    },
      err => {
        console.log(err.message);
        dialog.title = 'error ';
        dialog.text = err.message;
        this.dialogService.subjectType.next(dialog);
      });;
  }



  showBids(): void {
    this.setDataPoints = [];
    for (let i = 1; i <= 100; i++) {
      const bidOffer = i / 100;
      const obj = {
        label: `Bid: ` + bidOffer,
        y: this.bids.filter(b => +b.offer === bidOffer).length
      };
      if (obj.y > 0) {
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
  showMovie() {
    const dialogMovie = new DialogData("video");
    dialogMovie.show = true;
    dialogMovie.wide = true;
    dialogMovie.src = 'https://www.youtube.com/embed/J25xNqa-knI';
    this.dialogService.subjectType.next(dialogMovie);

  }

  updateStatusDialog(): void {
    // const dialogRef = this.dialog.open(UpdateStatusComponent, {
    //   panelClass: 'custom-dialog-container',
    //   width: '450px',
    //   height: '300px',
    //   data: this.auction
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

}

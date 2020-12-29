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
  Maxbid: BidModel;
  Minbid: BidModel;
  bid: BidModel;
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

  ngOnInit() {
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
        this.bidService.getAllBidsIncludingAuction(id);
      });
    this.bidService.subjectBidsInAuction.subscribe(bids => {
      this.bids = bids;
      this.Maxbid = bids.reduce((prev, current) => {
        return prev.offer > current.offer ? prev : current;
      });
      this.Minbid = bids.reduce((prev, current) => {
        return prev.offer < current.offer ? prev : current;
      });
    })
    this.bid = new BidModel();
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

  increament() {
    debugger;
    this.bid.offer += this.bid.offer;
  }


  showMovie() {
    const dialogMovie = new DialogData("video");
    dialogMovie.show = true;
    dialogMovie.wide = true;
    dialogMovie.src = 'https://www.youtube.com/embed/J25xNqa-knI';
    this.dialogService.subjectType.next(dialogMovie);

  }

  updateStatusDialog(): void {
  }

}
